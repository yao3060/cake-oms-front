<template>
  <CssLoading message="加载中" :loading="loading" />
  <div v-if="order.id" class="order-container">
    <OrderStatusComponent
      :order-id="order.id"
      :status="order.order_status"
      @updateStatus="updateStatus"
    />

    <nut-cell-group>
      <!-- <nut-cell class="store-name" :title="order.store_name">
        <template #link>
          <nut-button
            size="mini"
            shape="square"
            :type="OrderStatus[order.order_status].type"
          >{{ OrderStatus[order.order_status].label }}</nut-button>
          <nut-button
            class="print-button"
            size="mini"
            shape="square"
            type="success"
            @click="printIt(order.id)"
          >打印</nut-button>
        </template>
      </nut-cell>-->
      <nut-cell class="store-name" :title="`${order.billing_name}: ${order.billing_phone}`">
        <template #link>
          <nut-price
            :price="order.total"
            size="normal"
            :need-symbol="true"
            :thousands="true"
            class="total"
          />
        </template>
      </nut-cell>

      <nut-cell class="small-cell" title="订单编号" :desc="`${order.order_number}`" />
      <nut-cell class="small-cell" title="订单时间" :desc="order.created_at" />
      <nut-cell class="small-cell" title="订单来源" :desc="order.order_type" />
      <nut-cell class="small-cell" title="订货门店" :desc="order.store_name" />
      <nut-cell class="small-cell" title="下单人" :desc="order.creator" />

      <nut-cell class="small-cell" title="取货时间" :desc="order.pickup_time" />

      <nut-cell-group title="取货人" desc="edit">
        <nut-cell class="small-cell" title="收货人" :desc="contactInfo('shipping', order)" />
        <nut-cell class="small-cell" title="地址" :desc="order.shipping_address" />
        <template #desc>
          <nut-button
            :style="{ float: 'right', marginTop: '-30px', marginRight: '15px' }"
            size="mini"
            type="primary"
            @click="() => showPopup = !showPopup"
          >编辑/识别</nut-button>
        </template>
      </nut-cell-group>

      <nut-cell-group title="备注" desc="edit">
        <nut-cell title="我是标题" desc="描述文字">
          <div style="font-size: 0.75rem;">{{ order.note }}</div>
        </nut-cell>
        <template #desc>
          <nut-button
            :style="{ float: 'right', marginTop: '-30px', marginRight: '15px' }"
            size="mini"
            type="primary"
            @click="() => showNotePopup = !showNotePopup"
          >编辑</nut-button>
        </template>
      </nut-cell-group>
      <nut-divider />
      <OrderProducts :items="order.items" />
    </nut-cell-group>
    <nut-divider />
    <OrderOperations :order-id="order.id" />

    <nut-popup v-model:visible="showNotePopup" closeable :style="{ width: '100%' }">
      <nut-textarea v-model="order.note" />
      <div style="padding:20px 10px;">
        <nut-row :gutter="10">
          <nut-col :span="12" :offset="12">
            <nut-button :loading="loading" block type="success" @click="updateOrderNote">更新</nut-button>
          </nut-col>
        </nut-row>
      </div>
    </nut-popup>
    <nut-popup v-model:visible="showPopup" closeable :style="{ width: '100%' }">
      <div class="contact-info">
        <nut-textarea
          v-model="contact"
          placeholder="陕西省西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918"
        />
      </div>
      <div v-if="Object.keys(contactObject).length" class="contact-object">
        <nut-cell
          v-for="(item, index) in contactObject"
          :key="index"
          :title="labels[index]"
          :desc="item"
        />
      </div>
      <div style="padding:20px 10px;">
        <nut-row :gutter="10">
          <nut-col :span="12">
            <nut-button block type="primary" @click="analysisAddress">提取信息</nut-button>
          </nut-col>
          <nut-col :span="12">
            <nut-button
              :disabled="canSubmitShippingInfo"
              :loading="loading"
              block
              type="success"
              @click="updateOrderShippingInfo"
            >更新</nut-button>
          </nut-col>
        </nut-row>
      </div>
    </nut-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleOrder, updateSingleOrder, printSingleOrder } from '@/api/orders'
import OrderProducts from './components/OrderProducts.vue'
import OrderStatusComponent from './components/OrderStatus.vue'
import OrderOperations from './components/OrderOperations.vue'
import { OrderStatus, OrderStatusKey } from '@/types/OrderStatus'
import Order from '@/types/Order'
import smart from 'address-smart-parse'

export default defineComponent({
  name: 'SingleOrder',
  components: {
    OrderProducts, OrderStatusComponent, OrderOperations
  },
  setup() {
    const route = useRoute()
    const orderId = +route.params.orderId
    const order = reactive({ id: 0 }) as Order
    const labels = {
      shipping_name: '姓名：',
      shipping_phone: '手机号码：',
      shipping_address: '地址：',
    } as Record<string, string>

    const state = reactive({
      loading: false,
      showPopup: false,
      showNotePopup: false,
      contact: "",
      contactObject: {} as {
        shipping_name: string;
        shipping_phone: string;
        shipping_address: string;
      },
      canSubmitShippingInfo: true
    })

    onMounted(async () => {
      state.loading = true
      const response = await getSingleOrder(orderId)
      Object.assign(order, response)
      state.loading = false
    })

    const updateStatus = (index: number, key: OrderStatusKey) => {
      console.log('update status', index, key)
      order.order_status = key
    }

    const contactInfo = (type: string, order: Order) => {
      if (type == 'billing') {
        return `${order.billing_name} | ${order.billing_phone}`
      }
      if (type === 'shipping') {
        return `${order.shipping_name} | ${order.shipping_phone}`
      }
      return ''
    }

    const analysisAddress = () => {
      const address = smart(state.contact)
      console.log('analysis address', address)
      state.contactObject.shipping_name = address.name
      state.contactObject.shipping_phone = address.phone
      state.contactObject.shipping_address = address.address
      if (address.name && address.phone && address.address) {
        state.canSubmitShippingInfo = false
      }
    }

    const updateOrderShippingInfo = async () => {
      state.loading = true
      const response = await updateSingleOrder(orderId, state.contactObject)
      console.log(response)
      Object.assign(order, state.contactObject)
      state.loading = false
      state.showPopup = false
    }

    const updateOrderNote = async () => {
      state.loading = true
      const response = await updateSingleOrder(orderId, { note: order.note })
      console.log(response)
      state.loading = false
      state.showNotePopup = false
    }

    const printIt = async (id: number) => {
      const response = await printSingleOrder(id)
      console.log('PrintIt', response)
    }

    return {
      ...toRefs(state),
      labels,
      order,
      updateStatus,
      OrderStatus,
      contactInfo,
      analysisAddress,
      updateOrderShippingInfo,
      updateOrderNote,
      printIt
    }
  }
})
</script>

<style lang="scss">
.actions {
  text-align: right;
  .nut-button {
    margin-left: 10px;
  }
}
.store-name {
  font-weight: bold;
}
.table-title {
  // font-weight: bold;
}
.print-button {
  margin-left: 10px;
}
.order-container {
  .nut-cell {
    .nut-cell__value {
      color: #666;
    }
  }
}

.contact-info {
  padding-top: 10px;
}
.contact-object {
  .nut-cell {
    margin: 0;
    padding: 5px 20px;
    .nut-cell__value {
      color: #666;
    }
  }
}

</style>

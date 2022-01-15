<template>
  <CssLoading message="加载中" :loading="loading" />
  <div v-if="order.id" class="order-container">
    <OrderStatusComponent
      :order-id="order.id"
      :status="order.order_status"
      @updateStatus="updateStatus"
    />
    <nut-cell-group>
      <nut-cell class="store-name" :title="order.store_name">
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
      </nut-cell>
      <nut-cell title="下单时间" :desc="order.created_at" />
      <nut-cell title="订单号" :desc="`${order.order_number}`" />
      <nut-cell title="付款方式" :desc="order.payment_method" />
      <nut-cell title="取货时间" :desc="order.pickup_time" />
      <nut-cell title="派单编号" :desc="order.pickup_number" />
      <nut-cell-group title="收货人" desc="edit">
        <nut-cell title="收货人" :desc="contactInfo('shipping', order)" />
        <nut-cell title="收货人" :desc="order.shipping_address" />
        <template #desc>
          <nut-button
            :style="{ float: 'right', marginTop: '-30px', marginRight: '15px' }"
            size="mini"
            type="primary"
            @click="() => showPopup = !showPopup"
          >编辑</nut-button>
        </template>
      </nut-cell-group>

      <OrderProducts :items="order.items" />
    </nut-cell-group>

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
import { OrderStatus, OrderStatusKey } from '@/types/OrderStatus'
import Order from '@/types/Order'
import smart from 'address-smart-parse'

export default defineComponent({
  name: 'SingleOrder',
  components: {
    OrderProducts, OrderStatusComponent
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
  font-weight: bold;
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

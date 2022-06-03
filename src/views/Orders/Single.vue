<template>
  <div class="single-order">
    <CssLoading message="加载中" :loading="loading" />
    <div v-if="order.id" class="order-container">
      <OrderStatusComponent
        :order-id="order.id"
        :status="order.order_status"
        @updateStatus="updateStatus"
      />

      <nut-cell-group>
        <nut-cell class="store-name" :title="`${order.shipping_name}: ${order.shipping_phone}`">
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

        <Creator :id="order.id" :creator="order.creator" :store-id="order.store_id" />      
        <PickupMethod :id="order.id" :creator="order.creator" :value="order.pickup_method" />
        <PickupTime :id="order.id" :creator="order.creator" :value="order.pickup_time" />  
        
        <nut-cell class="small-cell" style="color:red" title="出品时间" :desc="order.pickup_time" />
        
        <!-- 只有下单人可以编辑联系方式 -->
        <nut-cell-group
          v-permission="['employee', 'customer-service', 'store-manager', 'administrator']"
          title="取货信息如下"
          desc=""
        >
          <nut-cell class="small-cell" title="收货人" :desc="contactInfo('shipping', order)" />
          <nut-cell class="small-cell" title="地址" :desc="order.shipping_address" />
          <!-- completed 后不可以再编辑 -->
          <template v-if="order.order_status !== 'completed'" #desc>
            <nut-button
              :style="{ float: 'right', marginTop: '-30px', marginRight: '15px' }"
              size="mini"
              type="primary"
              @click="() => showPopup = !showPopup"
            >
              编辑/识别
            </nut-button>
          </template>
        </nut-cell-group>

        <nut-cell-group title="整单备注" desc="edit">
          <nut-cell title="我是标题" desc="描述文字">
            <div style="font-size: 0.75rem;">{{ order.note }}</div>
          </nut-cell>
          <template #desc>
            <nut-button
              :style="{ float: 'right', marginTop: '-30px', marginRight: '15px' }"
              size="mini"
              type="primary"
              @click="() => showNotePopup = !showNotePopup"
            >
              编辑
            </nut-button>
          </template>
        </nut-cell-group>

        <nut-divider />

        <OrderProducts :items="order.items" :creator="order.creator" />
      </nut-cell-group>
      <nut-divider />

      <OrderOperations :order-id="order.id" :order-status="order.order_status" :framer="order.framer" />

      <nut-popup v-model:visible="showNotePopup" closeable :style="{ width: '100%' }">
        <nut-textarea v-model="order.note" />
        <div style="padding:20px 10px;">
          <nut-row :gutter="10">
            <nut-col :span="12" :offset="12">
              <nut-button :loading="loading" block type="success" @click="updateOrderNote">保存</nut-button>
            </nut-col>
          </nut-row>
        </div>
      </nut-popup>
      <nut-popup v-model:visible="showPopup" closeable :style="{ width: '100%' }">
        <div class="contact-info">
          <nut-textarea v-model="contact" placeholder="例如：上海市黄浦区南京东路20号，陈先生，13511111111" />
        </div>
        <div v-if="Object.keys(contactObject).length" class="contact-object">
          <nut-form>
            <nut-form-item
              v-for="(item, index) in contactObject"
              :key="index"
              :label="labels[index]"
              :data-label="item"
            >
              <nut-textarea
                v-if="index == 'shipping_address'"
                v-model="contactObject[index]"
                class="shipping_address"
                style="height: 80px;"
              />
              <input v-else v-model="contactObject[index]" class="nut-input-text" type="text">
            </nut-form-item>
          </nut-form>
        </div>
        <div style="padding:20px 10px;">
          <nut-row :gutter="10">
            <nut-col :span="12">
              <nut-button block type="primary" @click="analysisAddress">智能识别</nut-button>
            </nut-col>
            <nut-col :span="12">
              <nut-button
                :disabled="canSubmitShippingInfo"
                :loading="loading"
                block
                type="success"
                @click="updateOrderShippingInfo"
              >
                保存
              </nut-button>
            </nut-col>
          </nut-row>
        </div>
      </nut-popup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleOrder, updateSingleOrder } from '@/api/orders'
import OrderProducts from './components/OrderProducts.vue'
import OrderStatusComponent from './components/OrderStatus.vue'
import OrderOperations from './components/OrderOperations.vue'
import PickupMethod from './components/PickupMethod.vue'
import PickupTime from './components/PickupTime.vue'
import Creator from './components/Creator.vue'

import { OrderStatusKey } from '@/types/OrderStatus'
import Order from '@/types/Order'
import smart from 'address-smart-parse'

export default defineComponent({
  name: 'SingleOrder',
  components: {
    OrderProducts,
    OrderStatusComponent,
    OrderOperations,
    PickupMethod,
    PickupTime,
    Creator
},
  setup() {

    const route = useRoute()
    const orderId = +route.params.orderId
    // const order = reactive({ id: 0 }) as Order
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
      canSubmitShippingInfo: true,
      order: {} as Order
    })

    onMounted(async () => {
      state.loading = true
      const response = await getSingleOrder(orderId)
      console.log('getSingleOrder', response)
      Object.assign(state.order, response)

      state.contactObject.shipping_name = response.shipping_name
      state.contactObject.shipping_phone = response.shipping_phone
      state.contactObject.shipping_address = response.shipping_address

      if (response.shipping_name && response.shipping_phone && response.shipping_phone) {
        state.canSubmitShippingInfo = false
      }

      state.loading = false
    })

    const updateStatus = (index: number, key: OrderStatusKey) => {
      console.log('update status', index, key)
      state.order.order_status = key
    }

    const contactInfo = (type: string, order: Order) => {
      if (type == 'billing') {
        return `${order.billing_name}, ${order.billing_phone}`
      }
      if (type === 'shipping') {
        return `${order.shipping_name}, ${order.shipping_phone}`
      }
      return ''
    }

    const analysisAddress = () => {
      const address = smart(state.contact)
      console.log('analysis address', address)
      state.contactObject.shipping_name = address.name
      state.contactObject.shipping_phone = address.phone
      state.contactObject.shipping_address = `${address.province} ${address.city} ${address.county} ${address.address}`
      if (address.name && address.phone && address.address) {
        state.canSubmitShippingInfo = false
      }
    }

    const updateOrderShippingInfo = async () => {
      state.loading = true
      const response = await updateSingleOrder(orderId, state.contactObject)
      console.log(response)
      Object.assign(state.order, state.contactObject)
      state.loading = false
      state.showPopup = false
    }

    const updateOrderNote = async () => {
      state.loading = true
      const response = await updateSingleOrder(orderId, { note: state.order.note })
      console.log(response)
      state.loading = false
      state.showNotePopup = false
    }

    return {
      ...toRefs(state),
      labels,
      updateStatus,
      contactInfo,
      analysisAddress,
      updateOrderShippingInfo,
      updateOrderNote,
    }
  }
})
</script>

<style scoped lang="scss">
.actions {
  text-align: right;

  .nut-button {
    margin-left: 10px;
  }
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

  .shipping_address {
  }

  .nut-input .input-text {
    padding: 0;
  }
  .nut-cell {
    margin: 0;
    padding: 5px 20px;
    .nut-cell__title {
      font-size: 13px;
    }
    .nut-cell__value {
      color: #666;
      font-size: 13px;
    }
  }
}


</style>

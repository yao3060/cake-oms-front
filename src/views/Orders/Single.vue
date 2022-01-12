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
          <nut-button class="print-button" size="mini" shape="square" type="success">打印</nut-button>
        </template>
      </nut-cell>
      <nut-cell title="下单时间" :desc="order.created_at" />
      <nut-cell title="订单号" :desc="`${order.order_number}`" />
      <nut-cell title="付款方式" :desc="order.payment_method" />
      <nut-cell title="取货时间" :desc="order.pickup_time" />
      <nut-cell title="派单编号" :desc="order.pickup_number" />
      <nut-cell title="客户" :desc="contactInfo('billing', order)" />
      <nut-cell title="收货人" :desc="contactInfo('shipping', order)" />

      <OrderProducts :items="order.items" />
    </nut-cell-group>

    <nut-popup v-model:visible="showPopup" closeable :style="{ width: '100%' }">
      <div class="contact-info">
        <nut-textarea v-model="contact" />
      </div>
      <div style="padding: 20px;">
        <nut-button block type="primary">提取信息</nut-button>
      </div>
    </nut-popup>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleOrder } from '@/api/orders'
import OrderProducts from './components/OrderProducts.vue'
import OrderStatusComponent from './components/OrderStatus.vue'
import { OrderStatus, OrderStatusKey } from '@/types/OrderStatus'
import Order from '@/types/Order'

export default defineComponent({
  name: 'SingleOrder',
  components: {
    OrderProducts, OrderStatusComponent
  },
  setup() {
    const route = useRoute()
    const orderId = +route.params.orderId
    const order = reactive({ id: 0 }) as Order

    const state = reactive({
      loading: false,
      showPopup: true,
      contact: '',
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

    return {
      order,
      updateStatus,
      OrderStatus,
      contactInfo,
      ...toRefs(state)
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
</style>

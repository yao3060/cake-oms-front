<template>
  <nut-cell-group>
    <nut-cell
      class="store-name"
      :title="`${order.shipping_name}: ${order.shipping_phone}`"
      :to="`/orders/${order.id}`"
    >
      <template #link>
        <nut-price
          :price="order.total"
          size="normal"
          :need-symbol="true"
          :thousands="true"
          class="total"
        />
        <nut-button
          v-if="status === 'all'"
          style="margin-left: 10px; height:20px;line-height:1;"
          size="mini"
          shape="square"
          :type="formatOrderStatus(order.order_status).type"
        >{{ formatOrderStatus(order.order_status).label }}</nut-button>
      </template>
    </nut-cell>
    <!-- <nut-cell class="small-cell" title="订单号" :desc="order.order_number" /> -->
    <nut-cell class="small-cell" title="下单时间" :desc="order.created_at" />
    <nut-cell class="small-cell" title="取货时间" :desc="order.pickup_time" />
    <nut-cell class="small-cell" title="收货地址" :desc="order.shipping_address" />
  </nut-cell-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Order from '@/types/Order'
import { OrderStatus, OrderStatusKey } from '@/types/OrderStatus'

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup() {

    const formatOrderStatus = (status: OrderStatusKey | 'trash') => {
      if (status !== 'trash') {
        return OrderStatus[status]
      }

      return {
        'type': 'danger',
        'label': '作废'
      }
    }

    return { formatOrderStatus }
  }
})
</script>

<style scoped lang="scss">
.store-name {
  font-weight: bold;
  border-bottom: 1px solid #efefef;
  padding-top: 6px;
  padding-bottom: 6px;
}

.order-total {
  text-align: right;
  .total {
    margin-right: 10px;
  }
}
</style>

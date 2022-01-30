<template>
  <nut-cell-group>
    <nut-cell
      class="store-name"
      :title="`${order.billing_name}: ${order.billing_phone}`"
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
import { OrderStatus } from '@/types/OrderStatus'

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    }
  },
  setup() {
    return { OrderStatus }
  }
})
</script>

<style scoped lang="scss">
.store-name {
  font-weight: bold;
}

.order-total {
  text-align: right;
  .total {
    margin-right: 10px;
  }
}
</style>

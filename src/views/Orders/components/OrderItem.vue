<template>
  <nut-cell-group>
    <nut-cell
      class="store-name"
      :title="order.store_name"
      :to="`/orders/${order.order_number}`"
    >
      <template #link>
        <nut-button
          size="mini"
          type="primary"
        >
          {{ order.order_status }}
        </nut-button>
      </template>
    </nut-cell>
    <nut-cell
      title="订单号"
      :desc="order.order_number"
    />
    <nut-cell
      title="下单时间"
      :desc="order.created_at"
    />
    <nut-cell>
      <nut-row>
        <nut-col :span="8">
          <div class="flex-content">
            支付
          </div>
        </nut-col>
        <nut-col :span="16">
          <div class="order-total">
            <nut-price
              :price="order.total"
              size="small"
              :need-symbol="false"
              :thousands="true"
              class="total"
            />
            <nut-button
              size="mini"
              type="primary"
            >
              {{ order.payment_method }}
            </nut-button>
          </div>
        </nut-col>
      </nut-row>
    </nut-cell>
  </nut-cell-group>
</template>

<script lang="ts">
import { defineComponent, PropType} from 'vue'
import Order from '@/types/Order'

export default defineComponent({
  props:{
    order: {
      type: Object as PropType<Order>,
      required: true
    }
  },
  setup () {
    return {  }
  }
})
</script>

<style scoped lang="scss">
.store-name {
  font-weight: bold;
}
.order-total {
  text-align:right;
  .total {
    margin-right: 10px;
  }
}
</style>

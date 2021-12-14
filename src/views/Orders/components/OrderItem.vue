<template>
  <nut-cell-group>
    <nut-cell
      class="store-name"
      :title="order.shopName"
      :to="`/orders/${order.orderNo}`"
    >
      <template #link>
        <nut-button
          size="mini"
          type="primary"
        >
          {{ order.orderStateDesc }}
        </nut-button>
      </template>
    </nut-cell>
    <nut-cell
      title="下单时间"
      :desc="order.mealTm"
    />
    <nut-cell
      title="支付方式"
      :desc="order.payTypeDesc"
    />
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
</style>

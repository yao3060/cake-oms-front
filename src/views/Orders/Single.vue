<template>
  <Loading message="加载中" :loading="loading" />
  <div v-if="order" class="order-container">
    <OrderStatusComponent
      :order-id="order.id"
      :status="order.order_status"
      @updateStatus="updateStatus"
    />
    <nut-cell-group v-if="order">
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
      <nut-cell title="Time" :desc="order.created_at" />
      <nut-cell title="OrderNo" :desc="`${order.order_number}`" />
      <nut-cell title="付款方式" :desc="order.payment_method" />
      <OrderProducts :items="order.items" />
    </nut-cell-group>
  </div>
</template>

<script lang="ts">
import Order from '@/types/Order'
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleOrder } from '@/api/orders'
import OrderProducts from './components/OrderProducts.vue'
import OrderStatusComponent from './components/OrderStatus.vue'
import { OrderStatus, OrderStatusKey } from '@/types/OrderStatus'

export default defineComponent({
  name: 'SingleOrder',
  components: {
    OrderProducts, OrderStatusComponent
  },
  setup() {
    const route = useRoute()
    const orderNo = +route.params.orderNo
    const order = reactive<Order>({
      id: 0,
      order_number: '',
      store_name: '',
      order_status: 'pending',
      created_at: '',
      payment_method: '',
      items: [],
      total: ''
    })
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      const response = await getSingleOrder(orderNo)
      Object.assign(order, response)
      loading.value = false
    })

    const updateStatus = (index: number, key: OrderStatusKey) => {
      console.log('update status', index, key)
      order.order_status = key
    }

    return {
      order, loading, updateStatus, OrderStatus
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
.store-name {
  font-weight: bold;
}
.table-title {
  font-weight: bold;
}
.print-button {
  margin-left: 10px;
}
</style>

<template>
  <Loading
    message="加载中"
    :loading="loading"
  />
  <div
    v-if="orders.length"
    class="orders-page"
  >
    <h1>订单：</h1>
    <div class="orders-container">
      <OrderItem
        v-for="(o, i) in orders"
        :key="i"
        :order="o"
      />

      <nut-pagination
        v-model="query.page"
        :total-items="total"
        :items-per-page="query.per_page"
        mode="simple"
        @change="pageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import OrderItem from './components/OrderItem.vue'
import Order from '@/types/Order'
import { getOrders } from '@/api/orders'

export default defineComponent({
  name: 'OrdersIndex',
  components: {
    OrderItem
  },
  setup(){
    const orders = ref<Order[]>([]);
    const total = ref(0)
    const loading =ref(false)

    const query = ref({
      page:1,
      per_page: 2
    })

    const pageChange = (value: number) => {
      console.log('page changed', value)
      query.value.page = value
      getItems()
    }

    const getItems = async () => {
      loading.value = true
      const response =  await getOrders(query.value)
      orders.value = response.data
      total.value = response.total
      loading.value = false
    }

    onMounted( () => {
      getItems()
    })

    return { orders, query, total, pageChange, loading}
  }
})
</script>

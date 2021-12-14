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
        v-model="currentPage"
        :total-items="25"
        :items-per-page="5"
        @change="pageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import OrderItem from './components/OrderItem.vue'
import Loading from '@/components/Loading.vue'
import Order from '@/types/Order'
import { getOrders } from '@/api/orders'

export default defineComponent({
  name: 'OrdersIndex',
  components: {
    OrderItem, Loading
  },
  setup(){
    const orders = ref<Order[]>([]);
    const currentPage = ref(1)
    const perPage = ref(10)
        const loading =ref(false)

    const pageChange = (value: number) => {
      currentPage.value = value
    }

    onMounted(async () => {
        loading.value = true
      const response =  await getOrders()
      orders.value = response.data
        loading.value = false
    })

    return { orders, currentPage, perPage, pageChange, loading}
  }
})
</script>

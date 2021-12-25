<template>
  <Loading message="加载中" :loading="loading" />
  <div v-if="orders.length" class="orders-page">
    <SearchBar @search="SearchOrders" />
    <div class="orders-container">
      <OrderItem v-for="(o, i) in orders" :key="i" :order="o" />
      <nut-pagination
        v-model="query.page"
        :total-items="total"
        :items-per-page="query.per_page"
        mode="simple"
        @change="pageChange"
        style="padding-bottom: 100px;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import OrderItem from './components/OrderItem.vue'
import Order from '@/types/Order'
import { getOrders } from '@/api/orders'
import SearchBar from "./components/SearchBar.vue";

export default defineComponent({
  name: 'OrdersIndex',
  components: {
    OrderItem, SearchBar
  },
  setup() {
    const orders = ref<Order[]>([]);
    const total = ref(0)
    const loading = ref(false)

    const query = reactive({
      keyword: '',
      page: 1,
      per_page: 5
    })

    const pageChange = (value: number) => {
      console.log('page changed', value)
      query.page = value
      getItems()
    }

    const getItems = async () => {
      loading.value = true
      const response = await getOrders(query)
      orders.value = response.data
      total.value = response.total
      loading.value = false
    }

    const SearchOrders = (keyword: string) => {
      console.log("FromSearchBar", keyword)
      query.keyword = keyword
      getItems()
    }

    onMounted(() => {
      getItems()
    })

    return { orders, query, total, pageChange, loading, SearchOrders }
  }
})
</script>

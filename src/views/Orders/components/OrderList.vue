<template>
  <SearchBar @search="SearchOrders" />
  <CssLoading :loading="loading" />
  <div v-if="orders.length" class="orders-page">
    <div class="orders-container">
      <OrderItem v-for="(o, i) in orders" :key="i" :order="o" :status="status" />
      <nut-pagination
        v-model="query.page"
        :total-items="total"
        :items-per-page="query.per_page"
        mode="simple"
        style="padding: 0 16px 50px"
        @change="pageChange"
      />
    </div>
  </div>
  <div v-else class="not-found">
    <nut-empty v-if="!loading" description="没有订单" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import OrderItem from "./OrderItem.vue";
import Order from "@/types/Order";
import { getOrders } from "@/api/orders";
import SearchBar from "./SearchBar.vue";

export default defineComponent({
  name: "OrderList",

  components: {
    OrderItem,
    SearchBar,
  },

  props: {
    status: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const orders = ref<Order[]>([]);
    const total = ref(0);
    const loading = ref(false);
    const tabValue = ref(2);

    const query = reactive({
      status: props.status,
      keyword: "",
      page: 1,
      per_page: 10,
    });

    const pageChange = (value: number) => {
      console.log("page changed", value);
      query.page = value;
      window.scrollTo({ top: 0, behavior: "smooth" });
      getItems();
    };

    const getItems = async () => {
      loading.value = true;
      const response = await getOrders(query);
      orders.value = response.data;
      total.value = response.total;
      loading.value = false;
    };

    const SearchOrders = (keyword: string) => {
      console.log("FromSearchBar", keyword);
      query.keyword = keyword;
      getItems();
    };

    onMounted(() => {
      getItems();
    });

    return {
      tabValue,
      orders,
      query,
      total,
      pageChange,
      loading,
      SearchOrders,
    };
  },
});
</script>

<style scoped>
</style>

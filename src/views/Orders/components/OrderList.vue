<template>
  <SearchBar @search="SearchOrders" />
  <CssLoading :loading="loading" />
  <div v-if="orders.length" class="orders-page">
    <div class="orders-container">
      <OrderItem v-for="(o, i) in orders" :key="i" :order="o" />
      <nut-pagination
        v-model="query.page"
        :total-items="total"
        :items-per-page="query.per_page"
        mode="simple"
        @change="pageChange"
        style="padding-bottom: 100px"
      />
    </div>
  </div>
  <div v-else class="not-found">
    <h1 v-if="!loading" style="text-align: center;">Not Found</h1>
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

  components: {
    OrderItem,
    SearchBar,
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
      per_page: 5,
    });

    const pageChange = (value: number) => {
      console.log("page changed", value);
      query.page = value;
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
.orders-container {
  padding: 0px 10px;
}
</style>
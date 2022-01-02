<template>
  <nut-tabs v-model="tabValue">
    <nut-tabpane
      v-for="(status, index) in OrderStatus"
      :key="index"
      :title="status.label"
      :pane-key="index"
    >
      <OrderList v-if="index === tabValue" :status="index" :current-status="tabValue" />
    </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import OrderList from "./components/OrderList.vue";
import { OrderStatus } from "@/types/OrderStatus";

export default defineComponent({
  name: "OrdersIndex",
  components: {
    OrderList,
  },
  setup() {
    const tabValue = ref('pending');

    return {
      tabValue,
      OrderStatus,
    };
  },
});
</script>
<style scoped>
.nut-tabpane {
  padding: 0;
}
</style>

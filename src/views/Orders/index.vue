<template>
  <nut-tabs v-model="tabValue" @change="onChange">
    <nut-tabpane
      v-for="(status, index) in OrderStatus"
      :key="index"
      :title="status.label"
      :pane-key="index"
    >
      <OrderList v-if="index === tabValue" :status="index" :current-status="tabValue" />
    </nut-tabpane>
    <nut-tabpane :key="allTabIndex" title="所有单" pane-key="all">
      <OrderList v-if="'all' === tabValue" status="all" :current-status="tabValue" />
    </nut-tabpane>
  </nut-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import OrderList from "./components/OrderList.vue";
import { OrderStatus } from "@/types/OrderStatus";
import { useStore } from "@/store";
import { isFramer, getCurrentUser } from "@/utils/functions";

export default defineComponent({
  name: "OrdersIndex",
  components: {
    OrderList,
  },
  setup() {
    const tabValue = ref('unverified')
    const store = useStore()

    onMounted(() => {
      const storeTab = store.state.ordersTab
      console.log('storeTab', storeTab)
      if (storeTab !== tabValue.value) {
          tabValue.value = storeTab
      }

      if(isFramer(getCurrentUser())) {
          tabValue.value = 'verified'
      }

    })

    const onChange = ({ title, paneKey }: any) => {
      // remember current tab
      store.state.ordersTab = paneKey
    }

    return {
      tabValue,
      OrderStatus,
      allTabIndex: () => Object.keys(OrderStatus).length + 1,
      onChange
    };
  },
});
</script>
<style scoped>
.nut-tabpane {
  padding: 0;
}
</style>

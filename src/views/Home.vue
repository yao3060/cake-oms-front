<template>
  <div class="home-page-icons">
    <Loading message="加载中" :loading="loading" />

    <div v-if="showStats" class="statistics">
      <Statistics title="新订单" color="#40c9c6" icon="order" :start="0" :end="2000" />
      <Statistics title="新订单" color="#36a3f7" icon="order" :start="0" :end="1998" />
      <Statistics title="新订单" color="#f4516c" icon="order" :start="0" :end="8333" />
    </div>

    <!-- Admin can see this -->
    <h1 v-permission="['administer']">administer</h1>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, defineComponent, onMounted } from "vue";
import Statistics from "@/components/Statistics.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    Statistics,
  },
  setup() {
    const loading = ref(false);
    const app = getCurrentInstance();
    const route = useRoute();
    const showStats = ref(false);

    console.log("homepage route.path: ", route.path);

    onMounted(() => {
      console.log("ComponentCustomProperties ", app);
      app?.appContext.config.globalProperties.$toast.success("成功提示");
      showStats.value = true;
    });

    return { loading, showStats };
  },
});
</script>
<style lang="scss">
.home-page-icons {
  .icon-name {
    padding-top: 10px;
  }
}

.statistics {
  padding: 10px;
}

.hero {
  text-align: center;
}
</style>

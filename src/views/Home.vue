<template>
  <div class="home-page-icons">
    <Loading message="加载中" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  setup() {
    const loading = ref(false);
    onMounted(() => {
      const router = useRouter()
      router.push({ path: '/orders', replace: true })
    });

    return { loading };
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

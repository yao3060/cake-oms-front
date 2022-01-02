<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script lang="ts">
import { getToken } from "@/utils/auth";
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute();
    const key = computed(() => route.path);
    const store = useStore();

    // fill userinfo if token exist in cookie
    const reLoadUserInfo = () => {
      const cookieToken = getToken();
      const storeToken = store.state.userModule.token;
      if (cookieToken && !storeToken) {
        store.dispatch("userModule/me", { token: cookieToken });
      }
    };

    onMounted(() => {
      reLoadUserInfo();
    });
    return { key };
  },
});
</script>

<style scoped>
</style>

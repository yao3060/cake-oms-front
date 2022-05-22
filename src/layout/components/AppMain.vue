<template>
  <section class="app-main" :data-key="key">
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="userLoaded" />
    </router-view>
  </section>
</template>

<script lang="ts">
import { getToken } from "@/utils/auth";
import { defineComponent, ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute();
    const key = computed(() => route.path);
    const store = useStore();
    const userLoaded = ref(false)

    // fill userinfo if token exist in cookie
    const reLoadUserInfo = () => {
      const cookieToken = getToken();
      const storeToken = store.state.userModule.token;
      if (cookieToken && !storeToken) {
        store.dispatch("userModule/me", { token: cookieToken });
      }
      userLoaded.value = true
    };

    onBeforeMount(() => {
      reLoadUserInfo();
    });
    return { key, userLoaded };
  },
});
</script>

<style scoped>
</style>

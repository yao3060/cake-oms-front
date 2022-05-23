<template>
  <router-view v-if="userLoaded" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { getToken } from "@/utils/auth";
import { useStore } from '@/store'
export default defineComponent({
  name: 'App',
  setup() {
    const userLoaded = ref(false)
    const store = useStore()
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
      reLoadUserInfo()
    })
    return {
      userId: store.state.userModule.id,
      roles: store.state.userModule.roles,
      userLoaded
    }
  }
})
</script>

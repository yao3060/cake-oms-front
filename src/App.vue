<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    return {
      userId: store.state.userModule.id,
      roles: store.state.userModule.roles
    }
  }
})
</script>

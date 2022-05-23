<template>
  <section class="app-main" :data-key="key">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"

export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute()
    const key = computed(() => route.path)

    return { key }
  },
})
</script>

<style scoped>
</style>

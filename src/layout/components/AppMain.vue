<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent ({
  name: 'AppMain',
  setup(){
    const route = useRoute()
    const key = computed(() => route.path)
    return {key}
  }
})
</script>

<style scoped>

</style>

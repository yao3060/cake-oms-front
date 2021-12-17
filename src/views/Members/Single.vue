<template>
  <div>
    <h1>
      {{ userId }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const route = useRoute()
    return {userId: route.params.id}
  }
})
</script>

<style scoped>

</style>

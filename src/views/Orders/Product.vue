<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OrderProduct',
  prop: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped>
</style>

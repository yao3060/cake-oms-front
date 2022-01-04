<template>
  <div v-if="loading" class="loader-inner ball-grid-pulse">
    <div v-for="(o,i) in 9" :key="i"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'CssLoading',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
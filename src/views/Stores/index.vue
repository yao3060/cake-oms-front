<template>
  <div class="stores-list">
    <nut-cell
      v-for="(store, index) in stores"
      :key="index"
      :title="store.name"
      :sub-title="store.description"
      :desc="`编号：${store.slug}`"
    ></nut-cell>
  </div>
</template>

<script lang="ts">

import { getStores } from '@/api/stores'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

interface Store {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export default defineComponent({
  name: 'Stores',
  setup() {

    const state = reactive({
      stores: [] as Store[]
    })

    onMounted(async () => {
      const response = await getStores()
      Object.assign(state.stores, response)
    })

    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.stores-list {
  padding: 0 10px;
}
</style>

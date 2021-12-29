<template>
  <nut-skeleton
    v-for="(store, index) in stores"
    :key="index"
    width="250px"
    height="15px"
    title
    animated
    avatar
    row="3"
    :loading="false"
  >
    <div class="store-container">
      <nut-avatar size="50" icon="shop" />
      <div class="right-content">
        <div class="title">{{ store.name }} ({{ store.id }})</div>
        <div class="desc">{{ store.slug }}</div>
      </div>
    </div>
  </nut-skeleton>
</template>

<script lang="ts">
import Store from '@/types/Store'
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  name: 'Stores',
  props: {
    stores: {
      type: Array as PropType<Store[]>,
      required: true
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped>
.store-container {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 15px;
}
.store-container .right-content {
  margin-left: 19px;
  font-family: PingFangSC;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.store-container .right-content .title {
  font-size: 14px;
  color: #333;
}
.store-container .right-content .desc {
  margin-top: 10px;
  font-size: 13px;
  color: #9a9b9d;
}
</style>
<template>
  <div class="members-container">
    <nut-grid :column-num="3">
      <nut-grid-item v-for="i in 20" :key="i" :to="`/members/${i}`" class="member">
        <nut-avatar icon="my" size="large" shape="square" />
        <span class="name">Name</span>
        <span class="number">No1024</span>
      </nut-grid-item>
    </nut-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Members',
  setup() {

    const avatar = ref("https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png")

    return {
      avatar
    }
  }
})
</script>

<style  lang="scss" scoped>
.member {
  .name {
    line-height: 1.5em;
  }
  .name {
    padding: 5px 0;
  }
  .number {
    font-size: 12px;
    color: #666;
  }
}
</style>

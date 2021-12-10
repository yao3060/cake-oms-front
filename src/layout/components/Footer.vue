<template>
  <nut-tabbar
    v-model:visible="active"
    :bottom="true"
    @tab-switch="tabSwitch"
  >
    <nut-tabbar-item
      tab-title="首页"
      icon="home"
    />
    <nut-tabbar-item
      tab-title="分类"
      icon="category"
    />
    <nut-tabbar-item
      tab-title="发现"
      icon="find"
    />
    <nut-tabbar-item
      tab-title="购物车"
      icon="cart"
    />
    <nut-tabbar-item
      tab-title="我的"
      icon="my"
    />
  </nut-tabbar>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: 'Header',
  setup() {
    const active = ref(3)
    const tabSwitch = (item: Proxy, index: number) => {
      console.log(item, index);
    }
    return {
      tabSwitch, active
    }
},
})
</script>

<template>
  <nut-tabbar
    v-model:visible="active"
    :bottom="true"
    @tab-switch="tabSwitch"
  >
    <nut-tabbar-item
      v-for="(item, index) in menus"
      :key="index"
      :tab-title="item.title"
      :icon="item.icon"
      :to="item.to"
    />
  </nut-tabbar>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from "vue"
import { MenuItem } from '@nutui/nutui';
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'Footer',
  setup() {

    const tabSwitch = (item: MenuItem, index: number) => {
      console.log(item, index);
    }

    const menus = ref([
      {
        "index": 0,
        "title": "首页",
        'icon': "home",
        "to": "/"
      },
      {
        "title": "订单",
        'icon': "order",
        "to": "/orders"
      },
      {
        "title": "商品",
        'icon': "find",
        "to": "/products"
      },
      {
        "title": "店铺",
        'icon': "shop",
        "to": "/shops"
      },
      {
        "title": "我",
        'icon': "my",
        "to": "/me"
      }
    ])

    const active = ref(0)

    const route = useRoute()
    // switch foot menu according current route path
    watchEffect(()=> {
      if(route.path !== '/'){
        const index = menus.value.findIndex((item) => item.to === route.path)
        if(index !== -1 ){
          active.value = index
        }
      }
    })

    return {
      tabSwitch, active, menus
    }
},
})
</script>

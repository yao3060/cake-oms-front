<template>
  <nut-tabbar v-model:visible="active" :bottom="true" @tab-switch="tabSwitch">
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
import { defineComponent, ref, watchEffect } from "vue";
import { useRoute } from "vue-router"
import in_array from "in_array";

function array_pluck<T, K extends keyof T>(objs: T[], key: K): T[K][] {
  return objs.map(obj => obj[key]);
}

export default defineComponent({
  name: "Footer",
  setup() {
    const tabSwitch = (item: any, index: number) => {
      console.log('tabSwitch', item, index);
    };

    const menus = ref([
      // {
      //   index: 0,
      //   title: "首页",
      //   icon: "home",
      //   to: "/",
      // },
      {
        title: "首页",
        icon: "order",
        to: "/orders",
      },
      {
        title: "订单",
        icon: "order",
        to: "/orders",
      },
      {
        title: "店铺",
        icon: "shop",
        to: "/stores",
      },
      //{
      //  title: "员工",
      //  icon: "people",
      //  to: "/members",
      //}
      {
        title: "我的",
        icon: "my",
        to: "/me",
      },
    ]);

    const active = ref(0);

    const route = useRoute();
    // switch foot menu according current route path
    watchEffect(() => {
      if (route.path !== "/") {
        console.log('route', route.matched, array_pluck(route.matched, 'path'))
        const index = menus.value.findIndex((item) => in_array(item.to, array_pluck(route.matched, 'path')));
        if (index !== -1) {
          active.value = index;
        }
      }
    });

    return {
      tabSwitch,
      active,
      menus,
    };
  },
});
</script>

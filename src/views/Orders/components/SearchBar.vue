<template>
  <nut-searchbar
    v-model="keyword"
    placeholder="请输入 订单号 或 手机号码"
    background="linear-gradient(to right, #9866F0, #EB4D50)"
    input-background="#fff"
    @search="search"
  >
    <template v-slot:rightout>刷新</template>
  </nut-searchbar>
</template>

<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  reactive,
  ref,
  toRefs,
} from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["search"],
  setup(props, { emit }) {
    const app = getCurrentInstance();
    const state = reactive({
      keyword: "",
    });

    const search = () => {
      emit("search", state.keyword);
    };

    return {
      ...toRefs(state),
      search,
    };
  },
});
</script>

<style scoped>
</style>
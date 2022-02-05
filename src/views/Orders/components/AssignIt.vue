<template>
  <nut-button  @click="assignIt" shape="square" type="primary">派单</nut-button>

  <nut-actionsheet
    v-model:visible="isVisible"
    :menu-items="framers"
    description="指派裱花师"
    cancel-txt="取消"
    @choose="chooseItem"
  />
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, reactive, toRefs} from "vue";
import {printSingleOrder, updateSingleOrder} from "@/api/orders";
import { Dialog, Toast } from '@nutui/nutui';
import {getFramers} from "@/api/users";

interface Framer {
  id:number;
  name: string;
}

export default defineComponent({
  name: "AssignIt",
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  setup(props) {

    const app = getCurrentInstance()

    const state = reactive({
      loading: false,
      isVisible: false,
      framers: [] as Framer[]
    })

    const assignFramer = async (orderId: number, framerId: number) => {
      const response = await  updateSingleOrder(orderId, {framer: framerId})
    }

    const assignIt = async() => {
      const toast = app?.appContext.config.globalProperties.$toast.loading('加载中');
      const response = await getFramers()
      console.log('getFramers', response)
      toast.hide();
      Object.assign(state.framers, response)
      state.isVisible = !state.isVisible
    }

    const chooseItem = (itemParams: Framer) => {
      console.log('framer', itemParams)
      const toast = app?.appContext.config.globalProperties.$toast.loading('处理中');
      assignFramer(props.orderId, itemParams.id)
      toast.hide();
    };

    return {
      ...toRefs(state),
      assignIt, chooseItem
    }
  }
})
</script>

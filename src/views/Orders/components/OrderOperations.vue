<template>
  <div class="order-operations">
    <nut-button @click="trashIt" shape="square" type="primary">作废</nut-button>
    <nut-button @click="printIt" shape="square" type="primary">打印</nut-button>
    <!--    管理员和裱花管理员可以指派订单-->
    <nut-button v-permission="['administrator', 'framer-manager']" @click="assignIt" shape="square" type="primary">派单</nut-button>

    <nut-actionsheet
      v-model:visible="isVisible"
      :menu-items="framers"
      description="指派裱花师"
      cancel-txt="取消"
      @choose="chooseItem"
    />
  </div>
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
  name: "OrderOperations",
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

     const trashIt =  () => {
       console.log('trashIt', props.orderId)
       Dialog({
         title: '温馨提示',
         content: '“作废”为不可逆操作，“确认”后您将再也不能看到该订单！',
         onOk: async () => {
           console.log('event ok');
           const toast = app?.appContext.config.globalProperties.$toast.loading('处理中');
           const response = await updateSingleOrder(props.orderId, {
             status: 'trash'
           })
           toast.hide();
         },
       })
     }

     const assignFramer = async (orderId: number, framerId: number) => {
      const response = await  updateSingleOrder(orderId, {framer: framerId})
    }

    const printIt = async() => {
      console.log('printIt',props.orderId)
      const response = await printSingleOrder(props.orderId)
      console.log('PrintIt', response)
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
       trashIt, printIt, assignIt, chooseItem
    }
  }
})
</script>

<style lang="scss" scoped>
.order-operations {
  text-align: right;
  padding-right: 16px;

  .nut-button {
    margin-left: 10px;
  }
}
</style>

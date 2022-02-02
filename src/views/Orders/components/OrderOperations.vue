<template>
  <div title="OrderOperations" class="OrderOperations">
    <nut-button @click="trashIt" shape="square" type="primary">作废</nut-button>
    <nut-button @click="printIt" shape="square" type="primary">打印</nut-button>
    <nut-button @click="updateIt" shape="square" type="primary">改单</nut-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import {printSingleOrder, updateSingleOrder} from "@/api/orders";
import { Dialog, Toast } from '@nutui/nutui';

export default defineComponent({
  name: "OrderOperations",
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  setup(props) {

    const state = reactive({
      loading: false,
      visible: false
    })

     const trashIt =  () => {
       console.log('trashIt', props.orderId)
       Dialog({
         title: '温馨提示',
         content: '“作废”为不可逆操作，“确认”后您将再也不能看到该订单！',
         onOk: async () => {
           console.log('event ok');
           const toast = Toast.loading('处理中');
           const response = await updateSingleOrder(props.orderId, {
             status: 'trash'
           })
           toast.hide();
         },
       })
     }

    const printIt = async() => {
      console.log('printIt',props.orderId)
      const response = await printSingleOrder(props.orderId)
      console.log('PrintIt', response)
    }

    const updateIt = () => {
      console.log(props.orderId)
    }


    return {
       ...toRefs(state),
       trashIt, printIt, updateIt}
  }
})
</script>

<style lang="scss" scoped>
.OrderOperations {
  text-align: right;
  padding-right: 16px;

  .nut-button {
    margin-left: 10px;
  }
}
</style>

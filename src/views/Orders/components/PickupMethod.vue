<template>
  <nut-cell class="small-cell" title="取货方式" :desc="method" :is-link="isEditable" @click="switchActionSheet" />
  <nut-actionsheet
    v-model:visible="isVisible"
    :menu-items="methods"
    :choose-tag-value="selected"
    cancel-txt="取消"
    @choose="choose"
  />
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs, PropType, onMounted } from 'vue'
import { updateSingleOrder } from "@/api/orders"
import { Creator } from '@/types/Order'
import { useStore } from '@/store'
import { isAdministrator } from '@/utils/functions'

interface Method {
  name: string;
}

export default defineComponent({
  name: 'PickupMethod',

  props: {
    id: {
      type: Number,
      required: true
    },
    creator: {
      type: Object as PropType<Creator>,
      required: true
    },
    value: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const app = getCurrentInstance()
    const store = useStore()
    const state = reactive({
      isVisible: false,
      isEditable: false,
      method: props.value,
      selected: ''
    });

    // 配送，自提
    const methods = [
      {
        name: '配送'
      },
      {
        name: '自提'
      }
    ];

    onMounted(()=>{
      let currentUser =  getCurrentUser()
      console.log('currentUser',currentUser)
      // 只有管理员和自己能修改自己的订单
      if(isAdministrator(currentUser) || currentUser.id == props.creator.id ) {
        state.isEditable = true
      }
    })

    const getCurrentUser = () => {
      return store.state.userModule
    }

    const switchActionSheet = () => {
      state.isVisible = !state.isVisible
    }

    const updateOrderPickupMethod = async(orderId: number, method: string) => {
      const response = await updateSingleOrder(orderId, { pickup_method: method })
      console.log('updateOrderPickupMethod:', response)
    }

    const choose = (itemParams: Method) => {
      const toast = app?.appContext.config.globalProperties.$toast.loading('加载中');
      state.method = itemParams.name;
      state.selected = itemParams.name
      updateOrderPickupMethod(props.id, itemParams.name)

       toast.hide();
    }

    return { switchActionSheet, choose, methods, ...toRefs(state) };
  }
})
</script>

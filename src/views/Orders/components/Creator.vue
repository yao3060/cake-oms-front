<template>
  <nut-cell
    class="small-cell"
    title="下单人"
    :desc="desc"
    :is-link="isEditable"
    @click="switchActionSheet"
  />
  <nut-actionsheet v-model:visible="isVisible" :menu-items="menuItems" cancel-txt="取消" @choose="chooseItem" />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, onMounted } from 'vue'
import { Creator } from '@/types/Order'
import { getCurrentUser, isAdministrator, isMySubordinate } from '@/utils/functions'
import { getMembers } from '@/api/users'
import { updateSingleOrder } from "@/api/orders"

type menuItem = {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'Creator',
  props: {
    id: {
      type: Number,
      required: true
    },
    creator: {
      type: Object as PropType<Creator>,
      required: true
    },
    storeId: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const state = reactive({
      isEditable: false,
      isVisible: false,
      desc: props.creator.display_name || '',
      menuItems: [] as menuItem[]
    })

    const getCreators = async() => {
      if(state.menuItems.length) {
        return;
      }
      const response = await getMembers({"user-group":props.storeId })
      if(Array.isArray(response) && response.length) {
          response.map((user)=>{
            state.menuItems.push({
              id: user.id || 0,
              name: user.display_name,
            })
          })
      }
    }

    const switchActionSheet = () => {
      state.isVisible = !state.isVisible
      getCreators()
    }

     const chooseItem = async(item: menuItem) => {
      console.log(item)
      state.desc = item.name

      // update creator
      const response = await updateSingleOrder(props.id, { creator: item.id })
      console.log('Update Order Creator:', response)
    };

    onMounted(() => {
      let currentUser = getCurrentUser()

      // 只有管理员和自己能修改自己的订单
      if (isAdministrator(currentUser) || isMySubordinate(currentUser, props.creator.id) || currentUser.id == props.creator.id) {
        state.isEditable = true
      }
    })

    return { ...toRefs(state), switchActionSheet, chooseItem }
  }
})
</script>

<style scoped>
</style>

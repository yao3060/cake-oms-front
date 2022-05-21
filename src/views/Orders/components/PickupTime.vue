<template>
  <nut-cell class="small-cell" title="取货时间" :desc="pickupTime" :is-link="isEditable" @click="openForm" />
  <nut-datepicker
    v-model="currentDate"
    v-model:visible="isVisible"
    :min-date="minDate"
    title="时间选择"
    type="datetime"
    :filter="filter"
    :is-show-chinese="true"
    :minute-step="15"
    @confirm="update"
  />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, reactive, toRefs, onMounted } from 'vue'
import { Creator } from '@/types/Order'
import { isAdministrator, isMySubordinate, getCurrentUser } from '@/utils/functions'
import { updateSingleOrder } from "@/api/orders"

import { PickerOption } from '@nutui/nutui/dist/types/__VUE/picker/types'

export default defineComponent({
  name: 'PickupTime',

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
      required: false,
      default: ""
    },
  },
  setup(props) {
    const app = getCurrentInstance()
    const state = reactive({
      isVisible: false,
      isEditable: false,
      currentDate: new Date(),
      minDate: new Date(),
      pickupTime: props.value
    })

    onMounted(() => {
      let currentUser = getCurrentUser()
      console.log('PickupTime currentUser', currentUser)

      // 只有管理员和自己能修改自己的订单
      if (isAdministrator(currentUser) || isMySubordinate(currentUser, props.creator.id) || currentUser.id == props.creator.id) {
        state.isEditable = true
      }
    })

    const openForm = () => {
      if(state.isEditable){
        state.isVisible = !state.isVisible
      } else {
        console.log('not editable')
      }
    }

    const updateOrderPickupTime = async (orderId: number, value: string) => {
      const response = await updateSingleOrder(orderId, { pickup_time: value })
      console.log('updateOrderPickupTime:', response)
    }

    const update = (selected: Array<string>) => {
      const toast = app?.appContext.config.globalProperties.$toast.loading('加载中');
      console.log(typeof selected)
      state.pickupTime = selected.join('')

      updateOrderPickupTime(props.id, state.pickupTime)

      toast.hide();
    }

    const filter = (type: string, options: PickerOption[]): PickerOption[] => {
        console.log('datepicker filter',type, options)
        if (type == 'hour') {
          return options.filter((option:PickerOption) => Number(option.value) >= 6 &&  Number(option.value) <= 22 );
        }
        return options;
    }

    return { ...toRefs(state), openForm, update, filter }
  }
})
</script>

<style scoped>
</style>

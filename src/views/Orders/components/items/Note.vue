<template>
  <nut-cell
    :style="{ 'padding-left': 0, 'padding-right': 0}"
    title="备注"
    :desc="note"
    :is-link="isEditable"
    @click="baseClick"
  />
  <nut-popup v-model:visible="isVisible" pop-class="popclass" closeable :style="{ width: '100%' }" :z-index="100">
    <nut-form>
      <nut-form-item label="备注">
        <nut-textarea v-model="note" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button :loading="loading" block type="success" @click="updateNote">更新</nut-button>
    </nut-cell>
  </nut-popup>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, onMounted } from 'vue'
import OrderItem from "@/types/OrderItem"
import { Creator } from '@/types/Order'
import { updateOrderProduct } from '@/api/products'
import { isAdministrator, isMySubordinate, getCurrentUser } from '@/utils/functions'

export default defineComponent({
  name: "OrderItemNote",
  props: {
    item: {
      type: Object as PropType<OrderItem>,
      required: true
    },
    creator: {
      type: Object as PropType<Creator>,
      required: true
    },
  },
  setup(props) {

    const state = reactive({
      note: '',
      isVisible: false,
      isEditable: true,
      loading: false
    })

    onMounted(() => {
      state.note = props.item.note as string

      let currentUser = getCurrentUser()
      // 只有管理员和自己能修改自己的订单
      if (isAdministrator(currentUser) || isMySubordinate(currentUser, props.creator.id) || currentUser.id == props.creator.id) {
        state.isEditable = true
      }
    })

    const baseClick = (): void => {
      state.isVisible = !state.isVisible
    };

    const updateNote = async () => {
      state.loading = true
      const response = await updateOrderProduct(props.item.order_id, { note: state.note })
      console.log(response)
      state.loading = false
      state.isVisible = false
    }

    return { ...toRefs(state), baseClick, updateNote }
  }
})
</script>

<style scoped>
</style>

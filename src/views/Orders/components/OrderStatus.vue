<template>
  <div v-if="status == 'trash'">
    <nut-button block type="warning" shape="square" style="margin-top: -20px;">废弃订单</nut-button>
  </div>
  <nut-steps v-else :current="stepCurrent">
    <nut-step
      v-for="(item, index) in OrderStatus"
      :key="index"
      :title="item.label"
      @click="onClickStep(item.id, index)"
    >
      {{ item.id }}
    </nut-step>
  </nut-steps>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, ref, watchEffect, PropType } from 'vue'
import { updateSingleOrder } from '@/api/orders'
import { OrderStatus, AllOrderStatusKey } from '@/types/OrderStatus'

export default defineComponent({
  name: 'OrderStatusComponent',
  props: {
    status: {
      type: String as PropType<AllOrderStatusKey>,
      required: true
    },
    orderId: {
      type: Number,
      required: true
    }
  },
  emits: ['updateStatus'],
  setup(props, { emit }) {

    const app = getCurrentInstance()
    const stepCurrent = ref(1)

    // 从未审核到已审核: 最高管理员、下单人、下单人门店管理员，客服、客服管理员
    const onClickStep = async (index: number, label: string) => {
      console.log('onClickStep', index, label)
      if (index == stepCurrent.value + 1) {
        const response = await updateSingleOrder(props.orderId, {status: label})
        console.log(response)
        stepCurrent.value = index
        emit('updateStatus', index, label)
      } else {
        app?.appContext.config.globalProperties.$notify.warn("不能倒退操作流程。")
      }
    }

    watchEffect(() => {
      if (props.status !== 'trash') {
        stepCurrent.value = OrderStatus[props.status]?.id
      }
    })

    return {
      onClickStep, stepCurrent, OrderStatus
    }
  },

})
</script>

<style lang="scss" scoped>
</style>


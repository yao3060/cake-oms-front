<template>
  <nut-steps :current="stepCurrent">
    <nut-step
      v-for="(status,index) in OrderStatus"
      :key="index"
      :title="status.label"
      @click="onClickStep(status.id, index)"
    >{{ status.id }}</nut-step>
  </nut-steps>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, ref, watchEffect, PropType } from 'vue'
import { updateSingleOrder } from '@/api/orders'
import { OrderStatus, OrderStatusKey } from '@/types/OrderStatus'

export default defineComponent({
  name: 'OrderStatusComponent',
  props: {
    status: {
      type: String as PropType<OrderStatusKey>,
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

    const onClickStep = async (index: number, label: string) => {
      if (index == stepCurrent.value + 1) {
        const response = await updateSingleOrder(props.orderId, {
          status: 'processing'
        })
        console.log(response)
        stepCurrent.value = index
        emit('updateStatus', index, label)
      } else {
        app?.appContext.config.globalProperties.
          $notify.warn("请先完成上一步。")
      }
    }

    watchEffect(() => {
      stepCurrent.value = OrderStatus[props.status]?.id
    })

    return {
      onClickStep, stepCurrent, OrderStatus
    }
  },

})
</script>

<style lang="scss" scoped>
</style>


<template>
  <nut-steps :current="stepCurrent">
    <nut-step title="准备中" @click="onClickStep(1, '准备中')">1</nut-step>
    <nut-step title="制作中" @click="onClickStep(2, '制作中')">2</nut-step>
    <nut-step title="已完成" @click="onClickStep(3, '已完成')">3</nut-step>
  </nut-steps>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'OrderStatus',
  props: {
    status: {
      type: String,
      required: true,
      default: '0'
    }
  },
  emits: ['updateStatus'],
  setup(props, { emit }) {
    const stepCurrent = ref(1)
    const app = getCurrentInstance()

    const onClickStep = (index: number, label: string) => {
      if (index == stepCurrent.value + 1) {
        stepCurrent.value = index
        emit('updateStatus', index, label)
      } else {
        app?.appContext.config.globalProperties.
          $notify.warn("请先完成上一步。")
      }
    }

    return {
      onClickStep, stepCurrent
    }
  },

})
</script>

<style lang="scss" scoped>
</style>


<template>
  <nut-cell
    v-if="state.show"
    class="small-cell red-cell-16"
    :title="state.title"
    :desc="`${state.hours} 小时 ${state.minutes} 分钟 ${state.seconds} 秒`"
  />
</template>

<script setup lang="ts">
import { PropType, reactive, ref, watchEffect } from 'vue'
import Order from '@/types/Order'
const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true
  },
})

const countUpFromTime = (startAt: string) => {

  let timeDifference = new Date().getTime() - new Date(startAt).getTime();

  var secondsInADay = 60 * 60 * 1000 * 24,
    secondsInAHour = 60 * 60 * 1000;

  let days = Math.floor(timeDifference / (secondsInADay) * 1);
  let years = Math.floor(days / 365);
  if (years > 1) {
    days = days - (years * 365)
  }

  state.hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
  state.minutes = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
  state.seconds = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

  clearTimeout(interval.value)
  interval.value = setTimeout(() => countUpFromTime(startAt), 1000)
}

const hours = props.order.produce_time.d > 0 ? props.order.produce_time.d * 24 + props.order.produce_time.h : props.order.produce_time.h

const state = reactive({
  show: false,
  title: '',
  hours,
  minutes: props.order.produce_time.i,
  seconds: props.order.produce_time.s,
})

const interval = ref(0)

if (props.order.order_status === 'completed') {
  state.title = '制作耗时'
  state.show = true
}

if (props.order.order_status === 'processing') {
  state.title = '制作时长'
  state.show = true
  countUpFromTime(props.order.updated_at)
}

watchEffect(() => {
  console.log('props.order.order_status', props.order.order_status)

  if (props.order.order_status === 'completed') {
    clearTimeout(interval.value)
  }
})

</script>

<template>
  <nut-cell>
    <nut-row>
      <nut-col :span="12">
        <nut-icon :name="icon" :style="`color: ${color}`"></nut-icon>
      </nut-col>
      <nut-col :span="12">
        <div class="text-right">
          <h3 class="title">{{ title }}</h3>
          <Vue3autocounter
            class="counter"
            ref="counter"
            :startAmount="start"
            :endAmount="end"
            :duration="duration"
            separator=","
            decimalSeparator="."
            :decimals="0"
            :autoinit="true"
          />
        </div>
      </nut-col>
    </nut-row>
  </nut-cell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Vue3autocounter from 'vue3-autocounter'

export default defineComponent({
  name: 'Statistics',
  components: {
    Vue3autocounter
  },
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "#f4516c"
    },
    icon: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 3
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped>
.nutui-iconfont {
  font-size: 3rem;
  padding: 20px;
}
.text-right {
  text-align: right;
}
.title {
  margin: 0;
  line-height: 1.5em;
  font-size: 1rem;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.25);
}
.counter {
  font-size: 1.5rem;
}
</style>
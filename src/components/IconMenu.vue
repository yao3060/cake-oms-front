<template>

  <nut-col :span="span">
    <div class="flex-content">
      <router-link :to="link.to">
        <nut-icon
          :name="link.icon"
          :size="iconSize"
        />
        <span class="icon-name">{{ link.name }}</span>
      </router-link>
    </div>
  </nut-col>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import IconLink from '@/types/IconLink'

export default defineComponent({
  name: 'IconMenu',
  props: {
    link:{
      type: Object as PropType<IconLink>,
      required: true
    },
    span: {
      type: Number,
      default: 6,
    },
    iconSize: {
      type: Number,
      default: 40
    },

  },
})
</script>
<style lang="sass" scoped>
.flex-content
  padding: 12px 0
  text-align: center
  .icon-name
    display: block
    line-height: 2
</style>

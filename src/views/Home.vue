<template>
  <div class="home-page-icons">
    <nut-row :gutter="10">
      <IconMenu
        v-for="(icon, index) in icons"
        :key="index"
        :span="6"
        :icon-size="40"
        :link="icon"
      />
    </nut-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import IconMenu from '@/components/IconMenu.vue'
import IconLink from '@/types/IconLink'

export default defineComponent({
  name: 'Home',
  components: {
    IconMenu
  },
  setup() {
    const icons = reactive<IconLink[]>([{
      "icon": 'JD',
      "name": 'About',
      "to": "/about"
    },
    {
      "icon": 'JD',
      "name": '404',
      "to": "/404"
    }])
    return {icons}
  }
});
</script>
<style lang="sass" scoped>
.home-page-icons
</style>

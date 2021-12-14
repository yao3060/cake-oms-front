<template>
  <div class="home-page-icons">
    <Loading
      message="加载中"
      :loading="loading"
    />
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
import { ref, onMounted, defineComponent } from 'vue'
import IconMenu from '@/components/IconMenu.vue'
import Loading from '@/components/Loading.vue'
import IconLink from '@/types/IconLink'
import {getHomeMenus} from '@/api/app'

export default defineComponent({
  name: 'Home',
  components: {
    IconMenu, Loading
  },
  setup() {

    let icons = ref<Array<IconLink>>([])
    const loading =ref(false)

    onMounted(async () => {
      loading.value = true
      const response = await getHomeMenus()
      icons.value = response.data
      loading.value = false
   })

    return {icons, loading}
  }
})
</script>
<style lang="sass" scoped>
.home-page-icons
</style>

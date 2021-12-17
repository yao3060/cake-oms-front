<template>
  <div class="home-page-icons">
    <Loading
      message="加载中"
      :loading="loading"
    />
    <nut-grid :border="false">
      <nut-grid-item
        v-for="(icon, index) in icons"
        :key="index"
        :to="icon.to"
      >
        <nut-icon
          :name="icon.icon"
          :size="iconSize"
        />
        <span class="icon-name">{{ icon.name }}</span>
      </nut-grid-item>
    </nut-grid>
    <nut-divider />
    <div class="hero">
      <h1>Lorem Ipsum</h1>
      <h3>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>
      <h3>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h3>
    </div>
    <nut-divider />
    <!-- Admin can see this -->
    <h1 v-permission="['administer']">
      administer
    </h1>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import IconLink from '@/types/IconLink'
import {getHomeMenus} from '@/api/app'

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {

    let icons = ref<Array<IconLink>>([])
    const loading =ref(false)
    const iconSize = ref(40)

    onMounted(async () => {
      loading.value = true
      const response = await getHomeMenus()
      icons.value = response.data
      loading.value = false
   })

    return {icons, loading, iconSize}
  }
})
</script>
<style lang="scss" scoped>
.home-page-icons{
    .icon-name{
      padding-top: 10px}
}

.hero {
  text-align: center
}
</style>

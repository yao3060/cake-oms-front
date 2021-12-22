<template>
  <div class="home-page-icons">
    <Loading message="加载中" :loading="loading" />

    <nut-divider />
    <div class="hero" @click="myNotify">
      <h1>Click me</h1>
      <h3>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>
      <h3>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h3>
    </div>
    <nut-divider />
    <!-- Admin can see this -->
    <h1 v-permission="['administer']">administer</h1>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const loading = ref(false)
    const app = getCurrentInstance()

    onMounted(() => {
      console.log('ComponentCustomProperties ', app)
      app?.appContext.config.globalProperties.$toast.success('成功提示')
    })

    return { loading }
  }
})
</script>
<style lang="scss" scoped>
.home-page-icons {
  .icon-name {
    padding-top: 10px;
  }
}

.hero {
  text-align: center;
}
</style>

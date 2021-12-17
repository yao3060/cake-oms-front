<template>
  <nut-navbar
    :title="title"
    :left-show="showLeft"
    @on-click-back="back"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const title = ref('CakeOMS')
    const showLeft = ref(false)

    const route = useRoute()
    const router = useRouter()
    console.log(route.path)

    const back = () => {
      // go back by one record, the same as router.back()
      router.go(-1)
    }

    watchEffect(()=> {
      if(route.path !== '/') {
        showLeft.value = true
      } else {
        showLeft.value = false
      }
    })

    return { back, title, showLeft }
  },
})
</script>

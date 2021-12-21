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

    <nut-uploader
      v-model:file-list="uploadedMedia"
      :url="uploadUrl"
      :headers="uploadHeaders"
      upload-icon-size="2rem"
      xhr-state="201"
      class="full-width-uploader"
      @success="onSuccess"
    />

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
      icons.value = response
      loading.value = false
   })

   const uploadUrl = "http://localhost:8000/wp-json/wp/v2/media";
   const uploadHeaders = ref({
     Authorization: "Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTY0MDA1NTY3OCwibmJmIjoxNjQwMDU1Njc4LCJleHAiOjE2NDA2NjA0NzgsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.N8xeOvXxql16UWtQHCPKRBoFegNp3MiXziKVL8M1Bsk"
   })
   const uploadedMedia = ref([])

   const onSuccess = ({responseText}: any) => {
     const newImage = {
      name: responseText.title.rendered,
      url: responseText.source_url,
      type: responseText.media_type
    }
     console.log('onSuccess', newImage)
   }

    return {icons, loading, iconSize, uploadUrl, uploadHeaders, uploadedMedia, onSuccess}
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

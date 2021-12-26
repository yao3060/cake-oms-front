<template>
  <div class="nut-card">
    <div class="nut-card__left" style="margin-top: 20px; border:1px dashed #ccc;">
      <img :src="item.media_url || placeholder" />
    </div>
    <div class="nut-card__right">
      <nut-cell-group v-if="item">
        <nut-cell title="名称" :desc="item.product_name"></nut-cell>
        <nut-cell title="数量" :desc="`${item.quantity}`"></nut-cell>
        <nut-cell title="价格" :desc="item.price"></nut-cell>
        <nut-cell title="小计" :desc="item.total"></nut-cell>
      </nut-cell-group>
    </div>
  </div>
  <nut-divider content-position="left" style="padding-bottom: 20px;">更多图片</nut-divider>
  <nut-uploader
    :url="uploadUrl"
    :headers="uploadHeaders"
    :data="{ product_id: item.id, action: 'add_gallery_image' }"
    v-model:file-list="itemGallery"
    xhr-state="201"
    maximum="4"
    multiple
    @success="onSuccess"
    @delete="onDelete"
    @file-item-click="onItemClick"
  ></nut-uploader>
  <nut-imagepreview :show="showPreview" :images="imgData" @close="hideFn" />
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, onMounted, reactive, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'
import { deleteOrderProductGalleryImage, getOrderProduct } from "@/api/products"
import OrderItem from '@/types/OrderItem'
import { getToken } from '@/utils/auth'

interface ItemImage {
  id: number;
  item_id: number;
  media_url: string;
  created_at?: string
}

interface FileItem {
  id: number,
  name: string,
  url: string,
  type: string,
  status?: string,
  message?: string,
}

interface imgData {
  src: string;
}

export default defineComponent({
  name: 'OrderProduct',
  setup() {
    const app = getCurrentInstance()

    const state = reactive({
      showPreview: false,
      item: {} as OrderItem,
      imgData: [] as imgData[]
    });
    const uploadUrl = process.env.VUE_APP_BASE_API + "/wp/v2/media";
    const uploadHeaders = reactive({
      Authorization: "Bearer  " + getToken()
    })
    const route = useRoute()
    const orderId = +route.params.orderId
    const itemId = +route.params.itemId
    const itemGallery = ref<FileItem[]>([]);

    const onSuccess = ({ responseText, option, fileItem }: any) => {
      const response = JSON.parse(responseText)
      fileItem.id = response.id
      fileItem.url = response.source_url
    }

    const setItemGallery = (images: ItemImage[]) => {
      images.map((image) => {
        itemGallery.value.push({
          id: image.id,
          name: 'media',
          url: image.media_url,
          status: 'success',
          type: 'image'
        })
      })
    }

    const onDelete = async ({ file }: any) => {
      console.log('delete 事件触发', file)
      app?.appContext.config.globalProperties.$toast.loading('删除中')
      const response = await deleteOrderProductGalleryImage(file.id, itemId, orderId)
      app?.appContext.config.globalProperties.$toast.success('成功删除')
    }

    const getData = async () => {
      const response = await getOrderProduct(itemId, orderId)
      console.log(response)
      state.item = response
      if (response.gallery?.length) {
        setItemGallery(response.gallery)
      }
    }

    const showFn = () => {
      state.showPreview = true;
    }

    const hideFn = () => {
      state.showPreview = false;
    }

    const onItemClick = ({ fileItem }: any) => {
      console.log('onItemClick', fileItem)
      const { url } = fileItem
      if (state.imgData.find(element => element.src == url) == undefined) {
        state.imgData.push({ src: url })
      }
      state.showPreview = true
    }


    onMounted(() => {
      getData()
    })

    return {
      ...toRefs(state),
      showFn,
      hideFn,
      onItemClick,
      uploadUrl,
      uploadHeaders,
      itemGallery,
      onSuccess,
      onDelete,
      placeholder: require('@/assets/placeholder.png')
    }
  }
})
</script>

<style scoped>
.nut-cell-group__warp .nut-cell {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>

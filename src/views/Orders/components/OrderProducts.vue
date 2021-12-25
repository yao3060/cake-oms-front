<template>
  <nut-cell-group title="订单商品">
    <nut-cell class="table-title">
      <nut-row>
        <nut-col :span="6">{{ tableTitle.feature }}</nut-col>
        <nut-col :span="10">{{ tableTitle.product }}</nut-col>
        <nut-col :span="4">{{ tableTitle.quantity }}</nut-col>
        <nut-col :span="4">{{ tableTitle.total }}</nut-col>
      </nut-row>
    </nut-cell>
    <nut-cell
      v-for="(item, index) in items"
      :key="index"
      title="item.product_name"
      class="order-product"
    >
      <nut-row>
        <nut-col :span="6">
          <nut-uploader
            v-model:file-list="uploadedMedias[item.id]"
            :url="uploadUrl"
            :headers="uploadHeaders"
            :data="{ product_id: item.id }"
            xhr-state="201"
            style="width: 64px; height:64px;"
            @success="onSuccess"
            @delete="onDelete"
            @file-item-click="onItemClick"
          />
          <nut-imagepreview :show="showPreview" :images="imgData" @close="hideFn" />
        </nut-col>
        <nut-col :span="10">
          <router-link :to="`/orders/${orderId}/items/${item.id}`">{{ item.product_name }}</router-link>
        </nut-col>
        <nut-col :span="4">{{ item.quantity }}</nut-col>
        <nut-col :span="4">
          <nut-price :price="item.price" size="small" :need-symbol="true" :thousands="false" />
        </nut-col>
      </nut-row>
    </nut-cell>
  </nut-cell-group>
</template>

<script lang="ts">
import { defineComponent, watchEffect, PropType, reactive, toRefs } from 'vue'
import { getToken } from '@/utils/auth'
import { useRoute } from 'vue-router';

interface OrderItem {
  id: number,
  media_id: number | string,
  media_url: string,
  product_name: string,
  quantity: number | string,
  price: string,
}

interface FileItem {
  id: number,
  name: string,
  url: string,
  type: string,
  status?: string,
  message?: string,
}
// type uploadedMediaType
interface uploadedMediaType {
  [key: string]: FileItem[]
}

export default defineComponent({
  name: 'OrderProducts',
  props: {
    items: {
      type: Array as PropType<OrderItem[]>,
      required: true
    }
  },
  setup(props) {
    const uploadedMedias = reactive<uploadedMediaType>({})
    const imagePreviewData = reactive({
      showPreview: false,
      imgData: [{ src: '' }]
    });

    const route = useRoute()

    const tableTitle = {
      feature: '图片',
      product: '商品',
      quantity: '数量',
      total: '小计'
    }

    const hideFn = () => {
      imagePreviewData.showPreview = false;
    }

    const uploadUrl = process.env.VUE_APP_BASE_API + "/wp/v2/media";
    const uploadHeaders = reactive({
      Authorization: "Bearer  " + getToken()
    })

    const onSuccess = ({ responseText, option, fileItem }: any) => {
      console.log('onSuccess', responseText, option, fileItem)
      const productId = responseText.product_id
      const newImage: FileItem = {
        id: responseText.id,
        name: fileItem.name,
        url: responseText.source_url,
        status: 'success',
        type: responseText.media_type
      }
      uploadedMedias[productId] = [newImage]
    }

    const onDelete = ({ file }: any) => {
      console.log('delete 事件触发', file)
      uploadedMedias[file.file.id] = []
    }

    const onItemClick = ({ fileItem }: any) => {
      console.log('onItemClick', fileItem)
      const { url } = fileItem
      imagePreviewData.imgData[0].src = url
      imagePreviewData.showPreview = true
    }

    const setUploadedMedias = (items: any) => {
      if (items.length > 1) {
        items.forEach((item: any) => {
          console.log('setUploadedMedias', item)
          if (item.media_id) {
            uploadedMedias[item.id] = [{
              id: parseInt(item.id),
              name: item.product_name,
              url: item.media_url,
              type: 'image',
              status: 'success'
            }]
          }
        })
      }
    }

    watchEffect(() => {
      setUploadedMedias(props.items)
    })

    return {
      uploadedMedias, uploadUrl, uploadHeaders,
      onSuccess, onDelete, onItemClick,
      tableTitle,
      ...toRefs(imagePreviewData), hideFn,
      orderId: +route.params.orderNo
    }
  }
})
</script>

<style scoped>
</style>

<template>
  <div class="OrderItemImages">
    <!-- 只有下单人可以上传图片 v-permission="['employee', 'customer-service', 'store-manager', 'administrator']" -->
    <nut-uploader
      v-model:file-list="itemGallery"
      :url="uploadUrl"
      :headers="uploadHeaders"
      :data="{ product_id: itemId, action: 'add_gallery_image' }"
      xhr-state="201"
      maximum="4"
      multiple
      @success="onSuccess"
      @delete="onDelete"
      @file-item-click="onItemClick"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType} from 'vue'

import OrderItemImage from "@/types/OrderItemImage"
import useOrderItemImageRepository from "@/composables/useOrderItemImageRepository"
import { ImagePreview } from '@nutui/nutui'

export default defineComponent({
  name: "OrderItemImages",
  props: {
    itemId: {
      type: Number,
      required: true
    },
    orderId:{
      type: Number,
      required: true,
    },
    images: {
      type: Array as PropType<OrderItemImage[]>,
      required: true
    }
  },
  setup(props) {
    const OrderItemImageRepository = useOrderItemImageRepository(props.itemId, props.orderId, props.images)
    onMounted(()=> {
      // ImagePreview({
      //       show: true,
      //       images: [{src: '//m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg',}],
      // })
    })
    return {
      ...OrderItemImageRepository
    }
  }
})
</script>

<style lang="scss" scoped>
.OrderItemImages {
  padding-top: 10px;
  .nut-uploader__upload {
    border: 1px dashed #ccc;
  }
}
</style>

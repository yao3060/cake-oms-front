<template>
  <div class="OrderItemImages">
    <nut-uploader
      :url="uploadUrl"
      :headers="uploadHeaders"
      :data="{ product_id: itemId, action: 'add_gallery_image' }"
      v-model:file-list="itemGallery"
      xhr-state="201"
      maximum="4"
      multiple
      @success="onSuccess"
      @delete="onDelete"
      @file-item-click="onItemClick"
    ></nut-uploader>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'

import OrderItemImage from "@/types/OrderItemImage";
import useOrderItemImageRepository from "@/composables/useOrderItemImageRepository";

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

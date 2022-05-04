<template>
  <nut-cell-group title="订单商品" class="order-items-container">
    <nut-cell class="table-title">
      <nut-row>
        <nut-col :span="12">{{ tableTitle.product }}</nut-col>
        <nut-col :span="4">{{ tableTitle.price }}</nut-col>
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
        <nut-col :span="12">
          <router-link
            class="order-item-name"
            :to="`/orders/${orderId}/items/${item.id}`"
          >
            {{ item.product_name }}
          </router-link>
        </nut-col>
        <nut-col :span="4">
          <nut-price :price="item.price" size="small" :need-symbol="true" :thousands="false" />
        </nut-col>
        <nut-col :span="4">{{ item.quantity }}</nut-col>
        <nut-col :span="4">
          <nut-price :price="item.total" size="small" :need-symbol="true" :thousands="false" />
        </nut-col>
        <nut-col :span="24">
          <OrderItemImages
            :order-id="orderId"
            :item-id="item.id"
            :images="item.images"
          />
        </nut-col>
        <nut-col :span="24">
          <OrderItemNote :item="item" :creator="creator" />
        </nut-col>
      </nut-row>
    </nut-cell>
  </nut-cell-group>
</template>

<script lang="ts">
import { defineComponent, watchEffect, PropType, reactive, toRefs } from 'vue'
import { getToken } from '@/utils/auth'
import { useRoute } from 'vue-router'
import OrderItemImages from "./OrderItemImages.vue"
import OrderItemNote from "./items/Note.vue"
import OrderItem from "@/types/OrderItem"
import FileItem from "@/types/FileItem"
import { Creator } from '@/types/Order'

// type uploadedMediaType
interface uploadedMediaType {
  [key: string]: FileItem[]
}

export default defineComponent({
  name: 'OrderProducts',
  components: { OrderItemImages, OrderItemNote },
  props: {
    creator: {
      type: Object as PropType<Creator>,
      required: true
    },
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
      price: '单价',
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
      const response = JSON.parse(responseText)
      fileItem.id = response.id
      fileItem.url = response.source_url
    }

    const onItemClick = ({ fileItem }: any) => {
      console.log('onItemClick', fileItem)
      const { url } = fileItem
      imagePreviewData.imgData[0].src = url
      imagePreviewData.showPreview = true
    }

    const setUploadedMedias = (items: any) => {
      console.log('setUploadedMedias', items)
      if (items.length > 0) {
        items.forEach((item: any) => {
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
      uploadedMedias,
      uploadUrl,
      uploadHeaders,
      onSuccess,
      onItemClick,
      tableTitle,
      ...toRefs(imagePreviewData),
      hideFn,
      orderId: +route.params.orderId
    }
  }
})
</script>

<style lang="scss" scoped>
.order-items-container {
  .order-item-name {
    text-decoration: none;
    color: #333;
  }
}
</style>

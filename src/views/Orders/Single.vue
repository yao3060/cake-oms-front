<template>
  <Loading message="加载中" :loading="loading" />
  <div class="order-container">
    <div v-if="order" class="actions">
      <nut-button size="small" type="success">打印</nut-button>
    </div>
    <nut-cell-group v-if="order">
      <nut-cell class="store-name" :title="order.store_name">
        <template #link>
          <nut-button size="mini" type="primary">{{ order.order_status }}</nut-button>
        </template>
      </nut-cell>
      <nut-cell title="Time" :desc="order.created_at" />
      <nut-cell title="OrderNo" :desc="`${order.order_number}`" />
      <nut-cell title="付款方式" :desc="order.payment_method" />
      <nut-cell-group title="订单商品">
        <nut-cell class="table-title">
          <nut-row>
            <nut-col :span="6">图片</nut-col>
            <nut-col :span="8">商品</nut-col>
            <nut-col :span="4">数量</nut-col>
            <nut-col :span="6">小计</nut-col>
          </nut-row>
        </nut-cell>
        <nut-cell
          v-for="(item, index) in order.items"
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
              />
            </nut-col>
            <nut-col :span="8">
              <span>{{ item.id }}. {{ item.product_name }}</span>
            </nut-col>
            <nut-col :span="4">{{ item.quantity }}</nut-col>
            <nut-col :span="6">
              <nut-price :price="item.price" size="small" :need-symbol="true" :thousands="false" />
            </nut-col>
          </nut-row>
        </nut-cell>
      </nut-cell-group>
    </nut-cell-group>
  </div>
</template>

<script lang="ts">
import Order from '@/types/Order'
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getSingleOrder } from '@/api/orders'
import { getToken } from '@/utils/auth'

export default defineComponent({
  name: 'SingleOrder',
  components: {

  },
  setup() {
    const route = useRoute()
    const orderNo = route.params.orderNo
    const order = ref<Order>()
    const loading = ref(false)

    const uploadUrl = process.env.VUE_APP_BASE_API + "/wp/v2/media";
    const uploadHeaders = ref({
      Authorization: "Bearer  " + getToken()
    })

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
      [key: number]: FileItem[]
    }

    const uploadedMedias = reactive<uploadedMediaType>({})

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

    onMounted(async () => {
      loading.value = true
      const response = await getSingleOrder(orderNo)
      order.value = response
      setUploadedMedias(response.items)
      loading.value = false
    })

    const setUploadedMedias = (items: any) => {
      console.log('object')
      if (items.length > 1) {
        items.forEach((item: any) => {
          uploadedMedias[parseInt(item.id)] = [{
            id: parseInt(item.id),
            name: item.product_name,
            url: item.media_url,
            type: 'image',
            status: 'success'
          }]
        })
      }

    }

    return {
      order, loading, uploadedMedias, uploadUrl,
      uploadHeaders, onDelete, onSuccess
    }
  }
})
</script>

<style scoped lang="scss">
.actions {
  text-align: right;
  .nut-button {
    margin-left: 10px;
  }
}
.store-name {
  font-weight: bold;
}
.table-title {
  font-weight: bold;
}
</style>

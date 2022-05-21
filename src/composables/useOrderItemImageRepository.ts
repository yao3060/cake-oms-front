import { ref, reactive, getCurrentInstance, onMounted, toRefs } from 'vue'
import OrderItem from "@/types/OrderItem";
import imgData from "@/types/imgData";
import { getToken } from "@/utils/auth";
import FileItem from "@/types/FileItem";
import { deleteOrderProductGalleryImage } from "@/api/products";
import OrderItemImage from "@/types/OrderItemImage";

export default function useOrderItemImageRepository(orderId: number, itemId: number, images: OrderItemImage[]): any {
  const app = getCurrentInstance()

  const uploadUrl = process.env.VUE_APP_BASE_API + "/wp/v2/media";
  const uploadHeaders = reactive({
    Authorization: "Bearer  " + getToken()
  })

  const state = reactive({
    showPreview: false,
    item: {} as OrderItem,
    imgData: [] as imgData[],
    itemGallery: ref<FileItem[]>([]),
  });

  const onItemClick = ({ fileItem }: any) => {
    console.log('onItemClick', fileItem)
    const { url } = fileItem
      console.log(app?.appContext.config.globalProperties.$imagepreview)
      app?.appContext.config.globalProperties.$imagepreview({
        show: true,
        contentClose: true,
        images: [{ src: url }],
        onClose: () => {  console.log('imagepreview closed')}
      })

  }

  const onSuccess = ({ responseText, option, fileItem }: any) => {
    const response = JSON.parse(responseText)
    fileItem.id = response.id
    fileItem.url = response.source_url
  }

  const onDelete = async ({ file }: any) => {
    console.log('delete 事件触发', file)
    app?.appContext.config.globalProperties.$toast.loading('删除中')
    const response = await deleteOrderProductGalleryImage(file.id, itemId, orderId)
    console.log('on delete', response)
    app?.appContext.config.globalProperties.$toast.success('成功删除')
  }

  const setItemGallery = (images: OrderItemImage[]) => {
    images.map((image) => {
      state.itemGallery.push({
        id: image.id,
        name: 'media',
        url: image.media_url,
        status: 'success',
        type: 'image'
      })
    })
  }

  onMounted(() => {
    if (images && images.length) {
      setItemGallery(images)
    }
  })

  return {
    ...toRefs(state),
    uploadUrl,
    uploadHeaders,
    placeholder: require('@/assets/placeholder.png'),
    onItemClick,
    onSuccess,
    onDelete
  }
}

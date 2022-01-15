import request from '@/utils/request'

export function getOrderProducts(orderId: number): any {
  return request({
    url: `/oms/v1/orders/${orderId}/items`,
    method: 'get',
  })
}

export function getOrderProduct(itemId: number, orderId: number): any {
  return request({
    url: `/oms/v1/orders/${orderId}/items/${itemId}`,
    method: 'get',
  })
}

export function deleteOrderProductFeaturedImage(id: number) {
  return request({
    url: `/oms/v1/order-items/${id}/image`,
    method: 'delete',
  })
}

export function deleteOrderProductGalleryImage(
  id: number,
  itemId: number,
  orderId: number
): any {
  return request({
    url: `/oms/v1/orders/${orderId}/items/${itemId}/gallery/${id}`,
    method: 'delete',
  })
}
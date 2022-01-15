import request from '@/utils/request'

export function getOrders(params: any): any {
  return request({
    url: '/oms/v1/orders',
    method: 'get',
    params
  })
}

export function getSingleOrder(orderId: number): any {
  return request({
    url: `/oms/v1/orders/${orderId}`,
    method: 'get',
  })
}


export function updateSingleOrder(
  orderId: number,
  data: Record<string, unknown>
): unknown {
  return request({
    url: `/oms/v1/orders/${orderId}`,
    method: 'put',
    data
  })
}

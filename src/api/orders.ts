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

export function printSingleOrder(id: number) {
  return request({
    url: `/oms/v1/orders/${id}/print`,
    method: 'get',
  })
}


export function updateSingleOrder(orderId: number, data: Record<string, unknown>): any {
  return request({
    url: `/oms/v1/orders/${orderId}`,
    method: 'put',
    data
  })
}
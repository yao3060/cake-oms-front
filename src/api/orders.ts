import request from '@/utils/request'

export function getOrders(): any {
  return request({
    url: '/v1/orders',
    method: 'get',
  })
}

export function getSingleOrder(orderNo: any): any {
  return request({
    url: `/v1/orders/${orderNo}`,
    method: 'get',
  })
}

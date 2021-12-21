import request from '@/utils/request'

export function getOrders(params: any): any {
  return request({
    url: '/oms/v1/orders',
    method: 'get',
    params
  })
}

export function getSingleOrder(orderNo: any): any {
  return request({
    url: `/oms/v1/orders/${orderNo}`,
    method: 'get',
  })
}

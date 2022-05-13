import request from '@/utils/request'
import { AxiosPromise } from 'axios'

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

export function printSingleOrder(id: number): any {
  return request({
    url: `/oms/v1/print/orders/${id}`,
    method: 'get',
  })
}

export function updateSingleOrder(
  orderId: number,
  data: Record<string, unknown>
): AxiosPromise {
  return request({
    url: `/oms/v1/orders/${orderId}`,
    method: 'put',
    data
  })
}

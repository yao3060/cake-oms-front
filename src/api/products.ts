import request from '@/utils/request'

export function getProducts(): any {
  return request({
    url: '/v1/products',
    method: 'get',
  })
}

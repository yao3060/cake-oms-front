import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export function getStores() {
  return request({
    url: '/wp/v2/stores',
    method: 'get',
  })
}
import request from '@/utils/request'

export function getHomeMenus(): any {
  return request({
    url: '/oms/v1/menus',
    method: 'get',
  })
}

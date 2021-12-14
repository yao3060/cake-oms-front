import request from '@/utils/request'

export function getHomeMenus(): any {
  return request({
    url: '/v1/menus',
    method: 'get',
  })
}

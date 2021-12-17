import request from '@/utils/request'

export function login(): any {
  return request({
    url: '/v1/login',
    method: 'post',
  })
}

export function me(): any {
  return request({
    url: '/v1/me',
    method: 'get',
  })
}

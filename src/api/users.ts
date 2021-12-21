import request from '@/utils/request'
import LoginInfo from '@/types/LoginInfo'

export function login(data: LoginInfo): any {
  return request({
    url: '/jwt-auth/v1/token',
    method: 'post',
    data
  })
}

export function me(): any {
  return request({
    url: '/v1/me',
    method: 'get',
  })
}

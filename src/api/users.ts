import request from '@/utils/request'
import LoginInfo from '@/types/LoginInfo'
import { AxiosPromise } from 'axios'

export function login(data: LoginInfo): any {
  return request({
    url: '/jwt-auth/v1/token',
    method: 'post',
    data
  })
}

export function me(): any {
  return request({
    url: '/wp/v2/users/me',
    method: 'get',
    params: {
      context: "edit"
    }
  })
}

export function getUsers(params: Record<string, string | number>): AxiosPromise {
  return request({
    url: '/wp/v2/users',
    method: 'get',
    params
  })
}

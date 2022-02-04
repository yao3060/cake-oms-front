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

export function getMembers(params: Record<string, string | number>): any {
  return request({
    url: '/oms/v1/members',
    method: 'get',
    params
  })
}


export  function  getFramers() {
  return request({
    url: '/wp/v2/users',
    method: 'get',
    params: {
      roles: ['framer']
    }
  })
}

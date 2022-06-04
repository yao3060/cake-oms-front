import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  // do something before request is sent
  if (!config?.headers) {
    throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }
  console.log('Add Authorization', config.headers)
  if (store.getters['userModule/token']) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
},
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(response => response.data, error => {

  if (error?.response?.status < 500) {
    if (error.response.status === 401) {
      // to re-login
      alert('登录过期，重新登录。')
      store.dispatch('userModule/resetToken').then(() => location.reload())
      return Promise.reject(error.response)
    } else {
      return error.response
    }
  }

  return Promise.reject(error.response)
})

export default service

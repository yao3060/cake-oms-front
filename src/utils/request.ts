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
service.interceptors.response.use(response => {
  // console.log('response interceptor', response.data)
  return response.data
}, error => {

  console.log('Request:' + error) // for debug

  if (error?.response?.status < 500) {
    const errorCodes = ['disabled_token', 'unauthorized', 'other_clients_logged_in']
    if (error.response.data.code && errorCodes.indexOf(error.response.data.code.toLowerCase()) >= 0) {
      // to re-login
      console.log('You have been logged out, you can cancel to stay on this page, or log in again')
    } else {
      return error.response
    }
  }

  return Promise.reject(error)
})

export default service

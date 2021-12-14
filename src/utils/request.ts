import axios from 'axios'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

const JWTToken = getToken()
if (!JWTToken) {
  // Alter defaults after instance has been created
  service.defaults.headers.common['Authorization'] = `Bearer ${JWTToken}`
}

// request interceptor
service.interceptors.request.use((config) => {
  // do something before request is sent
  return config
},
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {

    console.log('Request:' + error) // for debug

    if (error.response.status < 500) {
      const errorCodes = ['disabled_token', 'unauthorized', 'other_clients_logged_in']
      if (error.response.data.code && errorCodes.indexOf(error.response.data.code.toLowerCase()) >= 0) {
        // to re-login
        console.log('You have been logged out, you can cancel to stay on this page, or log in again')
      } else {
        return error.response
      }
    }

    console.log(error.response.data.message)

    return Promise.reject(error)
  }
)

export default service

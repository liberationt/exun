import axios from 'axios'
import { Message } from 'element-ui'
import { getToken ,removeToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 5000 // request timeout
})
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()
      // config.headers['Authorization'] = 'JWT '+ getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
 
  response => {
    const res = response.data
    if (response.status === 200) {
      if(res.code===5004){
        
      }
       return res
    }
  },
  error => {
    Message({
      message:"服务拥挤，请稍后重试！",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

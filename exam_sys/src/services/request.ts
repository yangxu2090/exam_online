
import { message } from "antd";
import axios from "axios";

// 创建一个新的axios 实例
const request = axios.create({
  baseURL:'/bwapi'
})

const getItem = () => {
  const value = localStorage.getItem('token')
  if(!value) return location.assign('#/login')
  const obj = JSON.parse(value)
  if(obj['expires'] && new Date().getTime() > obj['expires']){
    localStorage.removeItem('token')
    return  location.assign('#/login')
  }
  return obj.value
}

// 添加请求拦截器， 同意给接口传入公共参数，例如token
request.interceptors.request.use(config => {
 config.headers.Authorization = localStorage.getItem('token')
  return config
})


// 提娜佳相应拦截器， 同意处理错误信息，例如401、403
request.interceptors.response.use(response => {
  return response
}, error => {
  if(error.status === 401){
    message.error('用户登录过期，请重新登录！')
    location.assign('#/login')
  }else if(error.status === 403) {
    message.error('此用户没有权限，请联系管理员！')
    location.assign('#/login')
  }
  return Promise.reject(error)
})






export default request




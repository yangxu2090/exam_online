import axios from 'axios'

import type { LoginCaptcha, Login, LoginResponse, UserInfoAll ,UserInfoType} from '../../type/services/login'

// axios.defaults.baseURL = 'https://zyxcl.xyz/exam_api'
axios.defaults.baseURL = '/bwapi'
import request from '../request'



// 获取图形验证码接口
export const getLoginCaptcha = () => {
  return request.get<LoginCaptcha>('/login/captcha')
}


//登录接口 
export const  getLogin = (params: Login) => {
  return request.post<LoginResponse>('/login', {
    ...params
  })
}


// 个人信息大全页面
export const useInfoApi = () => {
  return request.get('/user/info')
}

//获取左侧菜单
export const menulistApi = () => {
  return request.get('/user/menulist')
}





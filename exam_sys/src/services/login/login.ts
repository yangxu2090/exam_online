import axios from 'axios'

import type { LoginCaptcha, Login, LoginResponse, UserInfoAll ,UserInfoType} from '../../type/services/login'

// axios.defaults.baseURL = 'https://zyxcl.xyz/exam_api'
axios.defaults.baseURL = '/bwapi'




// 获取图形验证码接口
export const getLoginCaptcha = () => {
  return axios.get<LoginCaptcha>('/login/captcha')
}


//登录接口 
export const  getLogin = (params: Login) => {
  return axios.post<LoginResponse>('/login', {
    ...params
  })
}


// 个人信息大全页面
export const useInfoApi = () => {
  return axios.get('/user/info',{
    headers:{
      authorization: localStorage.getItem('token')
    }
  })
}







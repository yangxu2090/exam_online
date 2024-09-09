
// import axios from "axios";
import request from '../request'

import type {UpdateUserListParams, User } from '../../type/userManage/userList'
import type {Base } from '../../type/userManage/userList'


// 上传头像api
export const getUserListApi = (params:{avatar:string, [key :string]: any}) => {
  return request.post('/profile',{params})
}


// 修改用户信息
export const updateUserInfoApi = (params:UpdateUserListParams) => {
  return request.post<Base>('/user/update/info',params)
}






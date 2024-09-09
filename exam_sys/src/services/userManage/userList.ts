// 用户管理界面api


// import axios from "axios";
import request from '../request'
import type { Params, GetUserListApi, UpParams,Base } from '../../type/userManage/userList'


// axios.defaults.baseURL = '/bwapi'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// 用户管理界面api
export const getUserListApi = (params:Params) => {
  return request.get<GetUserListApi>('/user/list',{params})
}

// 更新启用用户状态
export const UpdataUserApi = (params:UpParams) => {
  return request.post<Base>('/user/update',params)
}

// 删除用户
export const RemoveUserApi = (params:UpParams) => {
  return request.post<Base>('/user/remove',params)
}

// 创建用户
export const CreateUserApi = (params:UpParams) => {
  return request.post<Base>('/user/create',params)
}


// // 查询角色
export const GetListRole = () => {
  return request.get<Base>('/role/list')
}





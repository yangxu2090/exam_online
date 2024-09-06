// 用户管理界面api


import axios from "axios";
import type { Params, GetUserListApi, UpParams,Base } from '../../type/userManage/userList'


axios.defaults.baseURL = '/bwapi'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// 用户管理界面api
export const getUserListApi = (params:Params) => {
  return axios.get<GetUserListApi>('/user/list',{params})
}

// 更新启用用户状态
export const UpdataUserApi = (params:UpParams) => {
  return axios.post<Base>('/user/update',params)
}

// 删除用户
export const RemoveUserApi = (params:UpParams) => {
  return axios.post<Base>('/user/remove',params)
}

// 创建用户
export const CreateUserApi = (params:UpParams) => {
  return axios.post<Base>('/user/create',params)
}


// // 查询角色
export const GetListRole = () => {
  return axios.get<Base>('/role/list')
}





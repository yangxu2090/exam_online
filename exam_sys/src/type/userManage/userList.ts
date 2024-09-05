// 用户管理界面api 类型
export type Base<T = any> = {
  code: number,
  msg: string,
  data: T
}

// params 类型
export type Params = {
  page:number,
  pagesize:number
}

export interface User {
  creator: string
  lastOnlineTime: number
  password: string
  status: 0 | 1
  username:string
  __v:number
  _id:string
  avator?:string
  role:string[]
  id?:string
}

//  用户管理界面返回的类型
export type  GetUserListApi = Base<{
  total:number,
  totalPage:number,
  list:User[]
}>
//  修改用户信息
export type UpParams = Partial<User>


//  修改用户信息
// export type  ModifyParams = {
//   username: string
//   password: string
//   sex?:string

// }











//基础
export  interface BaseRes<T = any> {
  code: number,
  msg: string,
  data: T,
  [key:string]:any
}

// 图片接口
export type LoginCaptcha  = BaseRes<{
  code: string
}>

// 登录参数
export interface Login {
  "username": string
  "password": string,
  "code": string
}


// 登录接口
export type LoginResponse = BaseRes<{
  token: string
}>


// 个人信息大全info
export interface Permission {
  createTime:number,
  disabled:boolean,
  isBtn:boolean,
  name:string,
  path:string,
  pid:string,
  _id:string,
  __v:string
}

export interface UserInfoAll{
  age?: number
  avator?: string
  email?: string
  permission?:Permission[]
  role?:any[],
  username?:string,
  _id?:string
  sex?: '男' | '女'
}

export type UserInfoType  = BaseRes<{
  data:UserInfoAll
}>




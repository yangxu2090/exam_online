

export type Base<T = any> = {
  code: number,
  msg: string,
  data: T
}



export interface List {
  createTime: number
  creator: string
  disabled:boolean
  name:string
  permission:string[]
  value:string
  __v:number
  _id:string
  [key:string]:any
}



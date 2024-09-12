

import request from '../request'

export interface ListItem {
  answer:string
  classify:string
  question:string
  type:string
  __v:string
  _id:string
  options:string[]
}


interface Params {
  page: number
  pagesize: number
}

interface Response {
  code: number
  msg: string
  data: {
    list:ListItem[]
    total:number
    totalPage:number
  }
}

// 查询题库
export const questionListApi = (params:Params) => {
  return request.get<Response>('/question/list',{
    params
  })
}

// 删除题库
export const removeQuestionListApi = (params:{id:string}) => {
  return request.post<Response>('/question/remove',params)
}



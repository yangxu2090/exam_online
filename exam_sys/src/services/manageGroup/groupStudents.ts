

import request from '../request'

interface Params {
  page: number
  pagesize: number
  username?: string
  sex?: string
  age?: number 
}

// 查询学生
export const studentListApi = (params:Params) => {
  return request.get('/student/list',{
    params
  })
}

interface UpParams {
  id: string
  age?:number
  className:string
  sex:'男' | '女'
  username:string
}

// 编辑学生
export const updateStudentListApi = (params:UpParams) => {
  return request.post('/student/update',params)
}

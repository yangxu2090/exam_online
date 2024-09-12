import request from "../request";

interface Params {
  page:number
  pagesize:number
  name?:string
  creator?:string
  createTime?:number
  classify?:string
}

// 获取试卷列表
export const examListApi = (params:Params) => {
  return request.get('/exam/list',{
    params
  })
}
interface UpParams {
  id:string
  name?:string
  classify?:string
  createTime?:number
  creator?:string
  index?:number
  questions?:string[]
  [key :string]:any 
}


// 编辑试卷列表
export const updateExamListApi = (params:UpParams) => {
  return request.post('/exam/update',params)
}

// 删除试卷
export const removeExamListApi = (params:{id:string}) => {
  return request.post('/exam/remove',params)
}


// 试卷详情
export const detailExamListApi = (params:{id:string}) => {
  return request.get('/exam/detail',{params})
}





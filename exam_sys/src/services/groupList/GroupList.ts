
import request from '../request'


export const studentGroupList = (params:{page:number, pagesize:number}) => {
  return request.get('/studentGroup/list',{
    params
  })
}



// 编辑班级
export const updateStudentGroupListApi = (params:{id:string, name:string,classify:string,teacher:string, createTime?:number}) => {
  return request.post('/studentGroup/update',params)
}





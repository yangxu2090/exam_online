

import request from '../request'




// 查询学生
export const examinationListApi = (params:any) => {
  return request.get('/examination/list',{params})
}


// 查询学生考试成绩
export const examinationDetailApi = (params:{id:string}) => {
  return request.get('/examination/detail',{params})
}








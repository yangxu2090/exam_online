
import request from '../request'



// 获取监考人信息  user/list
export const getProctorApi = () => {
  return request.get("/user/list")
}


// 获取科目分类  user/list
export const getSubjectApi = () => {
  return request.get("/classify/list")
}

// 获取考试班级  user/list
export const getClassApi = () => {
  return request.get("/studentGroup/list")
}














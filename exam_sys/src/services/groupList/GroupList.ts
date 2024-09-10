
import request from '../request'


export const studentGroupList = (params:{page:number, pagesize:number}) => {
  return request.get('/studentGroup/list',{
    params
  })
}








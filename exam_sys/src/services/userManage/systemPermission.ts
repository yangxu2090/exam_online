
import request from '../request'


// 查询菜单
export const permissionMenuApi = () => {
  return request.get('/permission/list')
}


//编辑角色 
export const updatePermissionMenuApi = (param:{id: string, name: string, permission:string[]}) => {
  return request.post('/role/update',param)
}







import axios from "axios";



axios.defaults.baseURL = '/bwapi'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')



// 上传头像api
export const getUserListApi = (params:{avatar:string, [key :string]: any}) => {
  return axios.post('/profile',{params})
}










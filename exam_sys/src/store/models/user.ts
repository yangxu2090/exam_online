import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserInfoAll } from '../../type/services/login'

// interface UserInfoResponse {
//   username: '',
//   _id: '',
//   permission: [],
//   role: [],
//   [key:string]: any
// }
const initialState: UserInfoAll = {
  username: '',
  _id: '',
  permission: [],
  role: [],
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action:PayloadAction<UserInfoAll>){
      return action.payload
    }
  }
})

export const { setUserInfo } = userSlice.actions


export default userSlice.reducer








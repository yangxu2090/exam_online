


import React, { useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import type {RootState } from '../../store/index' 
type Props  = React.PropsWithChildren


const Auth = (props: Props) => {
  const location = useLocation()
  const permission = useSelector((state: RootState) => state.user.permission)
  const [load,setLoad] = useState(false)
  const route = permission?.find(item => item.path === location.pathname)
  setTimeout(()=>{
    setLoad(true)
  },0)
 if(load){
  if(route){
    return props.children
  }
  return <Navigate to="/403" />
 }
}

export default Auth

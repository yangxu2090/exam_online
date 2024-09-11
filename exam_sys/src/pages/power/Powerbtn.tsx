







import React from 'react'
import { useSelector } from 'react-redux'
import { RootState} from '../../store/index'

type Props = {
  children: React.ReactNode
  powerBtn:string
}

const Powerbtn:React.FC<Props> = (props) => {
  const permission = useSelector((state:RootState)=>state.user.permission)
  const groupDelBtn = permission?.find(v => v.path === props.powerBtn)

  if(groupDelBtn){
    return props.children
  }
  return  null
}

export default Powerbtn


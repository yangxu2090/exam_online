






import React from 'react'
import { useSelector } from 'react-redux'
import { RootState} from '../../store/index'

type Props = {
  children: React.ReactNode
  powerBtn:string
}

const UsePowerbtn = (powerBtn: string) => {
  const permission = useSelector((state: RootState) => state.user.permission);
  const groupDelBtn = permission?.find(v => v.path === powerBtn);
  return groupDelBtn !== undefined;
}
const UsePower: React.FC<Props> = ({ children, powerBtn }) => {
  const hasPermission = UsePowerbtn(powerBtn);
  return hasPermission ? children : null;
};


export default UsePower









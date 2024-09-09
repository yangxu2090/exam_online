

import React, { useEffect, useState } from 'react'
import { Space, Switch, message } from 'antd';
import { UpdataUserApi } from '../../../../services/userManage/userList'
interface Props {
  status: 0 | 1,
  username: string
  _id: string,
  isModalOpen:boolean
  number:number
  setNumber:(n:number)=>void
}

const ToggleSwitch:React.FC<Props> = (props) => {
  const [oneSHow, setOneShow] = useState(false)
  const [toggle, setToggle] = useState(props.status === 1 ? true : false)

  const toggoleApi = async() => {
    try{
      const res = await UpdataUserApi({ id: props._id , status: toggle ? 0 : 1})
      if(res.data.code === 200){
        message.success("修改成功")
      }else{
        setToggle(!toggle)
        message.error(`设置失败，请重试`)
      }
    }catch(e){
      message.error(`设置失败，请重试${e}`)
    }
  }
  useEffect(()=>{
    setToggle(props.status === 1 ? true : false)
  },[props.status])


  return (
    <div>
      <Space direction="vertical" >
        <Switch 
        checkedChildren="开启" 
        unCheckedChildren="关闭" 
        defaultChecked 
        checked={toggle}
        disabled={props.username === 'root'}
        onChange={(checked)=> {
          setToggle(checked)
          toggoleApi()
          props.setNumber(props.number + 1)
        }}
        />
      </Space>
    </div>
  )
}

export default ToggleSwitch









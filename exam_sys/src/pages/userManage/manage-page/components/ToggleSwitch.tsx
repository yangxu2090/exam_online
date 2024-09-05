

import React, { useEffect, useState } from 'react'
import { Space, Switch, message } from 'antd';
import { UpdataUserApi } from '../../../../services/userManage/userList'
interface Props {
  status: 0 | 1,
  username: string
  _id: string,
  isModalOpen:boolean
}

const ToggleSwitch:React.FC<Props> = (props) => {
  const [oneSHow, setOneShow] = useState(false)
  const [toggle, setToggle] = useState(props.status === 1 ? true : false)

  const toggoleApi = async() => {
    try{
      const res = await UpdataUserApi({ id: props._id , username: props.username, status: toggle ? 1 : 0})
      console.log('执行了')
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
    // console.log('运行了')
    setOneShow(true)
    setToggle(props.status === 1 ? true : false)
   
  },[props.isModalOpen])

  useEffect(()=>{
    if(oneSHow){
      toggoleApi()
    }
    setOneShow(true)
  },[toggle])

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
        }}
        />
      </Space>
    </div>
  )
}

export default ToggleSwitch









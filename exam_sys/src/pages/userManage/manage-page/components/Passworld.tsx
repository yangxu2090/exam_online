


import React,{ useState } from 'react'
import {EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons'

import { Space } from "antd"
interface Props {
  password: string
}
const Passworld:React.FC<Props> = (props) => {
  const [show, setShow] = useState(false)
  return (
   <Space size='large' style={{display:'flex', justifyContent:'space-around'}}>
    <div style={{flex:1}}>{show ?  props.password  : "******" }</div>
    <div style={{width:'20px'}}  
    onMouseDown={()=>setShow(true)}
    onMouseMove={()=>setShow(false)}
    onMouseLeave={()=>setShow(false)}
    > {show ?  <EyeOutlined />  : <EyeInvisibleOutlined /> }</div>
   </Space>
  )
}

export default Passworld





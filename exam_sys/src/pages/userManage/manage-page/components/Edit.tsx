


import React from 'react'
import { Modal,Form, Space  } from "antd"
import { Button, Checkbox, Radio, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { UpdataUserApi} from '../../../../services/userManage/userList'
import type { UpParams } from '../../../../type/userManage/userList'
interface Props {
  isModalOpen:boolean,
  setIsModalOpen:(n:boolean) => void,
  editUserInfo: UpParams
}
type FieldType = {
  username?: string;
  password?: string;
  confirmpassword?:string,
  radioGroup?:number
};

interface Param {
  username?: string
  password?: string
  radioGroup?:number
  [key:string]: any
}


const Edit:React.FC<Props> = (props) => {

  const [ form ] = Form.useForm()

  const getUpadateInfo = async(param:Param) => {
    try{
      const res = await UpdataUserApi(param)
      if(res.data.code === 200){
        message.success('请求成功！')
        props.setIsModalOpen(false)
      }else{
        message.error('数据请求异常')
      }
    }catch(e){
      message.error('数据请求异常')
    }
  }

  const eventHandler = () => {
    form.validateFields()
    .then(res => {
      getUpadateInfo({
        id:props.editUserInfo._id,
        username: res.username,
        password: res.password,
        status:res.radioGroup as number
      })
    })
  
  }

  return (
    <Modal title="编辑用户" 
    open={props.isModalOpen} 
    onOk={()=>{
      eventHandler()
    }} 
    onCancel={()=>{
      props.setIsModalOpen(false)
    }}>
      
      <Space>
      <Form
    name="basic"
    form={form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ 
      username:props.editUserInfo.username,
      password:props.editUserInfo.password,
      confirmpassword:props.editUserInfo.password,
      radioGroup:props.editUserInfo.status
    }}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="账户"
      name="username"
      rules={[{ required: true, message: '请输入用户账号' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="密码"
      name="password"
      rules={[{ required: true, message: '请输入密码' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      label="确认密码"
      name="confirmpassword"
      rules={[
        {
          required: true,
          message: '请输入密码',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次密码不一致'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item 
    label="状态" 
    name='radioGroup'
    rules={[{ required: true, message: '请选择状态' }]}>
          <Radio.Group>
            <Radio value={1}> 启用 </Radio>
            <Radio value={0}> 禁用 </Radio>
          </Radio.Group>
      </Form.Item>
   
  </Form>  
      </Space>
    </Modal>
  )
}

export default Edit

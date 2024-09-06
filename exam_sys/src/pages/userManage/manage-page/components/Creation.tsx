
import React, { useEffect } from 'react'
import { Modal,Form, Space  } from "antd"
import { Button, Checkbox, Radio, Input, message,InputNumber,Select } from 'antd';
import type { FormProps } from 'antd';
import { CreateUserApi} from '../../../../services/userManage/userList'
import type { UpParams } from '../../../../type/userManage/userList'

interface Props {
  craete:boolean,
  setCraete:(n:boolean) => void,
}
type FieldType = {
  username?: string;
  password?: string;
  confirmpassword?:string,
  status:0 | 1
  age:number
  sex:0|1
  email:string
};

const Creation:React.FC<Props> = (props) => {

  const [ form ] = Form.useForm()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    // console.log('Success:', values);
    const temp = {...values}
    delete temp.confirmpassword
     try{
      const res = await CreateUserApi({...temp, id: Date.now() + ""})
      if(res.data.code === 200){
        message.success(`添加${temp.username}用户成功`)
      }else{
        message.error(res.data.msg)
      }
      props.setCraete(false);
     }catch(e){
      message.error('数据返回异常')
     }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    // props.setCraete(false);
    form.submit()
  };

  const handleCancel = () => {
    props.setCraete(false);
  }; 

  return (
  <>
  <Modal title="编辑用户" 
    open={props.craete} 
    onOk={handleOk} 
    onCancel={handleCancel}
    >
      <Space>
      <Form
    name="添加用户"
    form={form}
    onFinish={onFinish}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}

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
    <Form.Item<FieldType>
      label="年龄"
      name="age"
      rules={[{ required: true, message: '请输入年龄' }]}
    >
      <InputNumber  />
    </Form.Item>

    <Form.Item<FieldType>
      label="邮箱"
      name="email"
      rules={[{ required: true, message: '请输入邮箱' },{type:'email', message:'邮箱格式不正确'}]}
    >
      <Input  />
    </Form.Item>

    <Form.Item<FieldType>
          label="性别"
          name="sex"
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Select
            placeholder="选择性别"
            options={[
              { label: '男', value: 1 },
              { label: '女', value: 0 }
            ]}
          />
        </Form.Item>



    <Form.Item 
    label="状态" 
    name='status'
    rules={[{ required: true, message: '请选择状态' }]}>
          <Radio.Group>
            <Radio value={1}> 启用 </Radio>
            <Radio value={0}> 禁用 </Radio>
          </Radio.Group>
      </Form.Item>
   
  </Form>  
      </Space>
    </Modal>
  </>
  )
}

export default Creation




import React, { useState, forwardRef, useCallback, useImperativeHandle } from 'react';
import {
  Input,
  Form,
  Select
} from 'antd'
import type { FormInstance } from 'antd'

export interface ParamsForm {
  username:string
  sex:string
  status:number
} 

interface Props {
  onchange: (params: ParamsForm) => void
}

export interface SearchRef {
  form: FormInstance<any>
  a: number
}


const Search:React.ForwardRefRenderFunction<SearchRef, Props> = (props, ref) => {

  const [form] = Form.useForm()

   // 给父组件传入的ref对象赋值
  useImperativeHandle(ref, ()=>{
    // return的数据会赋值给ref.current
    return {
      form,
      a: 100
    }
  },[form])

  return (
    <div style={{ marginBottom: 10 }}>
      <Form
        layout="inline"
        form={form}
        autoComplete='off'
        onValuesChange={(changedValues,allValues)=>{
          props.onchange(allValues)
        }}
      >
        <Form.Item
          name="username"
          label="用户名"
        >
          <Input placeholder='用户名'></Input>
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
        >
          <Select
            placeholder="账号状态"
            allowClear
            options={[
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]}
          />
        </Form.Item>
        <Form.Item
          name="sex"
          label="性别"
        >
          <Select
            placeholder="性别"
            allowClear
            options={[
              { label: '男', value: '男' },
              { label: '女', value: '女' }
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
// forwardRef: 把父组件传入的ref转发给Search组件的第二个参数
export default forwardRef(Search)




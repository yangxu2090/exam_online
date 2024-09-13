





import React,{ useEffect, useState } from 'react'
import { Button, message, Space, Steps, theme } from 'antd'
import type { FormProps } from 'antd'
import { Checkbox, Form, Input } from 'antd'
import {  DatePicker, TimePicker,Select } from 'antd'
import { getProctorApi ,getSubjectApi,getClassApi } from '../../../services/exam/create'


const { RangePicker } = DatePicker;
const steps = [
  {
    title: '考试基本信息',
    content: 'First-content',
  },
  {
    title: '配置试卷',
    content: 'Second-content',
  },
  {
    title: '发布考试',
    content: 'Last-content',
  },
]

type FieldType = {
  name?:string
  endTime?:string
  examId?:string
  examiner?:string
  group?:string
  classify?:string
  startTime?:string
};



interface DataObj {
  proctor:{
    id:string,
    username:string
  }[]
  subject:{
    id:string,
    name:string
  }[]
  classifys:{
    id:string,
    name:string
  }[]
}


const Create = () => {
  const [form] = Form.useForm<FieldType>()
  const [current, setCurrent] = useState(0)
  const [dateObj, setDateObj] = useState<DataObj>({
    proctor:[],
    subject:[],
    classifys:[]
  })



  const next = () => {
    setCurrent(current + 1);
  }
  const getData = async() => {
    const res1 = await getProctorApi()
    const res2 = await getSubjectApi()
    const res3 = await getClassApi()
    const obj = {
      proctor: res1.data.data.list.map((item: any) => {
        return {
          id:item._id,
          username:item.username
        }
      }),
      subject:res2.data.data.list.map((item : any) => {
        return {
          id:item._id,
          name:item.name
        }
      }),
      classifys:res3.data.data.list.map((item:any)=>{
        return {
          id:item._id,
          name:item.name
        }
      })
    }
    setDateObj(obj)

  }

  useEffect(()=>{
    getData()
  },[])


  const prev = () => {
    setCurrent(current - 1);
  }
  const items = steps.map((item) => ({ key: item.title, title: item.title }))


  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: '请输入时间' }]
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    next()
  };




  return (
    <>
      <Steps current={current} items={items} />  

     {current === 0 &&  <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="考试名称"
          name="name"
          rules={[{ required: true, message: '请输入考试内容' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="startTime" label="开始时间" {...rangeConfig}>
        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
        <Form.Item<FieldType>
          label="科目分类"
          name="classify"
          rules={[{ required: true, message: '请选择考试分类' }]}
        >
          <Select>
            {dateObj.subject.map(item => 
              <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
            )}
        </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="监考人"
          name="examiner"
          rules={[{ required: true, message: '请选择监考人' }]}
        >
          <Select>
            {dateObj.proctor.map(item => 
              <Select.Option value={item.username} key={item.id}>{item.username}</Select.Option>
            )}
        </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="考试班级"
          name="group"
          rules={[{ required: true, message: '请选择班级' }]}
        >
          <Select>
            {dateObj.classifys.map(item => 
              <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
            )}
        </Select>
        </Form.Item>
      </Form>}


      <Space>
      {current < steps.length - 1 && (
          <Button type="primary" onClick={() => {
            form.submit()
          }}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            提交
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            返回上一页
          </Button>
        )}

      </Space>
    </>
  )
}

export default Create

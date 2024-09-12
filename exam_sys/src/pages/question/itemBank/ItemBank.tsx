


import React, {useEffect, useState} from 'react'
import { questionListApi, removeQuestionListApi } from '../../../services/itemBank/itemBank'
import { Space, Table, Tag,Button } from 'antd';
import type { TableProps } from 'antd';
import type { ListItem } from '../../../services/itemBank/itemBank';

import type { FormProps } from 'antd';
import { Form, Input,Popconfirm ,message, Drawer  } from 'antd';

type FieldType = {
  question?: string;
  __v?: string;
  classify?: string;
};






const ItemBank = () => {
  const [data, setData] = React.useState<ListItem[]>([])
  const [params, setParams] = React.useState({page:1, pagesize:10}) // 分页
  const [totatal, setTotal] = React.useState(0) // 总页数
  const [paramsChange, setParamsChange] = React.useState<{classify:string, question:string} | null>(null)
  const [form] = Form.useForm()
  const [count, setCount] = React.useState(0)
  const [open, setOpen] = useState(false);
  const [showData, setShowData] = React.useState<ListItem | null>(null)



  const getDate = async() => {
    const res = await questionListApi({...params,...paramsChange})
    if(res.data.code === 200){
      setData(res.data.data.list)
      setTotal(res.data.data.total)
    }
  }

  useEffect(() => {
    getDate()
  }, [])
  useEffect(() => {
    getDate()
  },[params,paramsChange])

  useEffect(() => {
    getDate()
  }, [count])
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setParamsChange({
      classify: values.classify as string,
      question: values.question!,
    })
  };

  const columns: TableProps<ListItem>['columns'] = [
    {
      title: '试题列表',
      dataIndex: 'question',
      width: 300,
      align: 'center',
      key: 'question',
      ellipsis: true, // 设置为 true 表示单行文本超出时显示省略号
    },
    {
      title: '分类',
      align: 'center',
      key: '__v',
      render: (_, record) => <Tag color="blue">{record.__v + '' === '0' ? '单选题' : '多选题'}</Tag>,
    },
    {
      title: '题型',
      dataIndex: 'classify',
      align: 'center',
      key: 'classify',
      
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          <Popconfirm
            title="是否删除此试卷"
            onConfirm={async()=>{
              const res = await removeQuestionListApi({id:record._id})
              if(res.data.code === 200){
                message.success('删除成功')
                setCount(count+1)
              }
            }}
            // onCancel={cancel}
            okText="删除"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
          <Button type="link" onClick={()=>{
             setOpen(true)
             setShowData(record)
             console.log(record)
          }}>试题详情</Button>
        </Space>
      ),
    },
  ];


  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Form
    name="basic"
    layout="inline"
    form={form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 800 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="试题"
      name="question"
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="题型"
      name="classify"
    >
       <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Space>
      <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button type="default" onClick={()=>{
          setParamsChange(null)
          form.resetFields()
        }}>
          重置
        </Button>
    </Space>
    
    </Form.Item>
  </Form>

    <Table 
    style={{marginTop:20}}
    columns={columns} 
    dataSource={data}
    rowKey='_id'
    pagination={{
      current: params.page,
      total: totatal,
      pageSize: params.pagesize,
      onChange: (page,pagesize) => {
        setParams({page,pagesize})
      }
    }}
    />
     <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <h3>题目：{showData?.question}</h3>
        <p>选项</p>
        {showData?.options?.map(item => <p>{item}</p> )}
     </Drawer>
    </>
  )
}

export default ItemBank

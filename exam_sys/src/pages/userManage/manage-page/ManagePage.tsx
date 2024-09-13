




import React, { useEffect, useRef, useState } from 'react'
import { getUserListApi,RemoveUserApi } from '../../../services/userManage/userList'
import type { Params, User } from '../../../type/userManage/userList'
import { message, Table ,Space,Tag ,Button,Image,Popconfirm  } from "antd"
import type { TableProps } from 'antd';
import { current } from '@reduxjs/toolkit';
import  Passworld  from './components/Passworld'
import  ToggleSwitch from './components/ToggleSwitch'
import dayjs from 'dayjs';
import Edit  from '../manage-page/components/Edit'
import type { UpParams } from '../../../type/userManage/userList'
import type { PopconfirmProps } from 'antd';
import Assigning from './components/Assigning'
import Creation from './components/Creation'
import Search from './components/Search'

import type { ParamsForm, SearchRef } from './components/Search'

const cancel: PopconfirmProps['onCancel'] = (e) => {
  message.error('点击了取消');
};




const ManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 编辑开关
  const [isAssigning, setIsAssigning] = useState(false); // 分配角色开关
  const [craete, setCraete] = useState(false) // 新建用户开关
  const [editUserInfo, setEditUserInfo] = useState<UpParams>({})
  const [number, setNumber] = useState(0)
  const [params, setParams] = useState<Params>({
    page:1,
    pagesize: 5
  })
  const [data, setData] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [searchContent,setSearchContent] = useState<ParamsForm | null>(null)
  const  searchRef = useRef<SearchRef>(null)

  const confirm = async (id :string) => {
    try{
      const res = await RemoveUserApi({id})
      if(res.data.code === 200){
        message.success('删除成功');
        getUserList()
      }else{
        message.success('出现了异常');
      }
    }catch(error){
     console.log(error)
    }
    
  };
  // 获取列表数据接口
  const getUserList = async () => {
    try{
      const res = await getUserListApi(params)
      if(res.data.code === 200){
        setData(res.data.data.list)
        setTotal(res.data.data.total)
      }else{
        message.error(`数据获取异常`)
      }
    }catch(e){
      message.error(`数据获取异常${e}`)
    }
  }
  const columns: TableProps<User>['columns'] = [
    {
      title: '头像',
      key: 'avator',
      render: (_, record) => {
        return  record.avator ? <Image width={100} src={record.avator}/> : <p>用户未创建头像</p>
      }
    },
    {
      title: '是否禁用',
      key: 'status',
      render:(_, record) => {
        return <ToggleSwitch 
                setNumber={setNumber}
                number={number}
                isModalOpen={isModalOpen}
                status={record.status as 0 | 1}
                username={record.username!}
                _id={record._id!}
                ></ToggleSwitch>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      key: 'password',
      width:'200',
      render:(_, record)=> {
        return <Passworld password={record.password as string}></Passworld>
      }
    },
    {
      title: '最近登陆',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
      render:(_, record) => {
        return dayjs(record.lastOnlineTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '操作',
      key: 'address',
      render: (_, record) => {
        return (
          <Space>
            <Button 
            size="small" 
            type="primary" 
            disabled={record.username === 'root'}
            onClick={()=>{
              setEditUserInfo({...record})
              setIsAssigning(true)
            }}
            >分配角色</Button>
            <Button 
            size="small" 
            disabled={record.username === 'root'}
            ghost  
            type="primary"
            onClick={()=>{
              setEditUserInfo({...record})
              setIsModalOpen(true)
            }}>编辑</Button>

              <Popconfirm
              title="确定要删除此用户吗？"
              onConfirm={() => confirm(record._id as any)}
              onCancel={cancel}
              okText="确认"
              cancelText="取消"
            >   
            <Button danger size="small" type="primary" disabled={record.username === 'root'}>删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  useEffect(()=>{
    getUserList()
  },[params,number])

  useEffect(()=>{
    if(!isAssigning){
      getUserList()
    }
  },[isAssigning])
  useEffect(()=>{
    if(!craete){
      getUserList()
    }
  },[craete])

  useEffect(()=>{
    getUserList()
  },[number])

  useEffect(()=>{
    if(!isModalOpen){
      getUserList()
      setEditUserInfo({})
    }
  },[isModalOpen])



  return (
    <div>
      <Search ref={searchRef}  onchange={setSearchContent}></Search>
      <Space>
        <Button size="large" type="primary" onClick={()=>setCraete(true)}>添加用户</Button>
        <Button size="large" type="primary" onClick={()=>{
          setParams({
            ...searchContent,
            page:params.page,
            pagesize: params.pagesize
          })
        }}>搜索</Button>
        <Button size="large" type="default" onClick={()=>{
          searchRef.current?.form.resetFields()
          setSearchContent(null)
          setParams({
            page:params.page,
            pagesize: params.pagesize
          })
        }}>重置</Button>
      </Space>
      <Table 
      style={{marginTop:'20px'}}
      columns={columns} 
      dataSource={data}
      rowKey='_id'
      pagination={{
        current: params.page,
        align:'center',
        pageSize:params.pagesize,
        total,
        showSizeChanger:true,
        pageSizeOptions:[5,10,15],
        onChange:(page, pagesize) => {
          setParams({
            ...searchContent,
            page,
            pagesize
          })
        }
      }}
      />;
      {isModalOpen && <Edit 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editUserInfo={editUserInfo}
      ></Edit>}
      {isAssigning && <Assigning
        id={editUserInfo._id!}
        role={editUserInfo.role!}
        isAssigning={isAssigning}
        setIsAssigning={setIsAssigning}
      ></Assigning>}
      {craete && <Creation
      craete={craete}
      setCraete={setCraete}
      >
        </Creation>}
    </div>
  )
}

export default ManagePage






import React, { useEffect, useState } from 'react'
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





const cancel: PopconfirmProps['onCancel'] = (e) => {
  message.error('点击了取消');
};




const ManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 编辑开关
  const [isAssigning, setIsAssigning] = useState(false); // 分配角色开关
  const [editUserInfo, setEditUserInfo] = useState<UpParams>({})
  const [params, setParams] = useState<Params>({
    page:1,
    pagesize: 5
  })
  const [data, setData] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const confirm = async (id :string) => {
    try{
      const res = await RemoveUserApi({id})
      if(res.data.code === 200){
        message.success('删除成功');
        getUserList()
      }else{
        message.success('出现了异常');
      }
    }catch(e){
      message.error('出现了异常');
    }
    
  };
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
                isModalOpen={isModalOpen}
                status={record.status}
                username={record.username}
                _id={record._id}
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
        return <Passworld password={record.password}></Passworld>
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
  },[params, isModalOpen,isAssigning])

  return (
    <div>
      <Table 
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
    </div>
  )
}

export default ManagePage

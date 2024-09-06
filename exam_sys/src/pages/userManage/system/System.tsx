

import React, { useEffect, useState } from 'react'
import { Space, Table, Tag,message,Button } from 'antd';
import type { TableProps } from 'antd';
import { GetListRole } from '../../../services/userManage/userList'
import type { List } from '../../../type/userManage/systemList'
import dayjs from 'dayjs';

const columns: TableProps<List>['columns'] = [
  {
    title: '角色',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '角色关键字',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '创建时间',
    key: 'createTime',
    render: (_, record) => record.createTime ? dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') : '--',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
       <Button size="middle" type="primary">分配角色</Button>
       <Button size="middle" danger type="dashed">删除</Button>
      </Space>
    ),
  },
];



const System = () => {
  const [role, setRole] = useState<List[]>([])

  useEffect(()=>{
    const getRole = async () => {
      try{
        const res = await GetListRole()
        if(res.data.code === 200) {
          setRole(res.data.data.list)
        }else{
          message.error(res.data.msg)
        }
      }catch(e){
        message.error(`数据获取异常${e}`)
      }
    }

    getRole()

  },[])


  return (
    <>
      <Space style={{marginBottom:10}}>
        <Button size="large" type="primary">新增角色</Button>
      </Space>
      <Table columns={columns} dataSource={role} rowKey='_id' />;
    </>
  )
}

export default System

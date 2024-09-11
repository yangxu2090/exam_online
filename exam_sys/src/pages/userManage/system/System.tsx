

import React, { useEffect, useState } from 'react'
import { Space, Table, Tag,message,Button } from 'antd';
import type { TableProps } from 'antd';
import { GetListRole } from '../../../services/userManage/userList'
import type { List } from '../../../type/userManage/systemList'
import dayjs from 'dayjs';
import Distribution from './components/Distribution'





const System = () => {
  const [role, setRole] = useState<List[]>([])
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [curRow,setCurRow] = useState<string[]>([])
  const [curRowId,setCurRowId] = useState<{id:string, name: string} | null>(null)

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
         <Button size="middle" type="primary" onClick={()=>{ 
          showLoading()
          setCurRow(record.permission)
          // const obj: CheckedPer = {
          //   checked: [],
          //   halfChecked: []
          // }
          // record.permission.forEach(id => {
          //   // 遍历当前行的权限，判断此权限是不是第一级权限
          //   const first = permission.find(item => item._id === id)
          //   if (first) {
          //     // 如果是第一级权限，并且所有子权限都在当前权限内，表示当前权限可以全选
          //     if (first.children.every(v => record.permission.includes(v._id))) {
          //       obj.checked.push(id)
          //     } else {
          //       obj.halfChecked.push(id)
          //     }
          //   } else {
          //     obj.checked.push(id)
          //   }
          // })

          setCurRowId({id: record._id, name: record.name})
         }}>分配角色</Button>
         <Button size="middle" danger type="dashed">删除</Button>
        </Space>
      ),
    },
  ];
  
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

  useEffect(()=>{
    getRole()
  },[])

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(()=>{
    if(!open){
      setCurRowId(null)
      setCurRow([])
      getRole()
    }
  },[open])

  return (
    <>
      <Space style={{marginBottom:10}}>
        <Button size="large" type="primary">新增角色</Button>
      </Space>
      <Table columns={columns} dataSource={role} rowKey='_id' />;

      {open && <Distribution 
                open={open}  
                curRow={curRow}
                curRowId={curRowId!}
                setOpen={setOpen}
                showLoading={showLoading}
                loading={loading}
                />}
    </>
  )
}

export default System

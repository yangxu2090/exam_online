
import React, { useEffect,useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable,TableDropdown } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { permissionMenuApi } from '../../../services/userManage/systemPermission';


interface PermissionMenu {
  name:string
  path:string
  _id:string
  createTime:number
  isBtn:boolean
  disabled:number
  __v:number
  children?:PermissionMenu[]
}

export type Status = {
  color: string;
  text: string;
};


const columns: ProColumns<PermissionMenu>[] = [
  {
    title: '菜单名称',
    width: 150,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '菜单路径',
    dataIndex: 'path',
    width: 220,
    key:'path'
  },
  {
    title: '权限类型',
    key:'__v',
    width: 120,
    editable: false,
    render(dom, entity, index, action, schema) {
      return <Tag>{entity.__v === 0? '页面' : '应用'}</Tag>
    },
  },
  {
    title: '创建时间',
    key:'createTime',
    valueType: 'option',
    width: 120,
     editable: false,

    render(dom, entity, index, action, schema) {
      return dayjs(entity.createTime).format('YYYY-MM-DD')
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        style={{color:'#1890ff'}}
        onClick={() => {
          action?.startEditable?.(record._id);
        }}
      >
        编辑
      </a>,
      <a href={"#"} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },

];


const MenuManage = () => {
  
  return (
    <>
     <ProTable<PermissionMenu>
      columns={columns}
      request={async(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        const res = await permissionMenuApi()
        console.log(res.data.data.list)
        return {
          data: res.data.data.list,
          success: true,
          total: res.data.data.total,

        };
      }}
      editable={{
        type: 'multiple',
        // onSave:(...res) =>{
        //   console.log(res);
        // },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      rowKey="_id"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      headerTitle="权限管理"
      options={false}
    />
    </>
  )
}

export default MenuManage


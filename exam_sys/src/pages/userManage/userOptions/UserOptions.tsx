


import React,{useState} from 'react'
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { getUserListApi,RemoveUserApi ,UpdataUserApi} from '../../../services/userManage/userList'
// import { UpdataUserApi } from '../../../../services/userManage/userList'

import { Image, Switch } from 'antd';

export type TableListItem = {
  key?: number;
  // name: string;
  // updatedAt: number;
  // createdAt: number;
  // progress: number;
  // money: number;
  // percent: number | string;
  // createdAtRange: number[];
  // code: string;
  // avatar: string;
  // image: string;
  creator?:string
  lastOnlineTime?:number
  role?:string[]
  status: 0| 1
  username:string
  _id:string
  __v:number
  avator?:string
  password:string
  [key:string]:any
};




interface Params {
  page:number,pagesize:number
}


const UserOptions = () => {

  const [params ,setParams] = useState<Params>({
    page:1,
    pagesize: 5
  })
  const [data, setData] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '头像',
      dataIndex: 'avator',
      key: 'avator',
      valueType: 'indexBorder',
      render(dom, entity, index, action, schema) {
        return entity.avator? <Image src={entity.avator} width={100}/> : <p>用户未创建头像</p>
      },
    },
    {
      title: '启动状态',
      key: 'status',
      width: 120,
      dataIndex: 'status',
      render(dom, entity, index, action, schema) {
        return <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={entity.status === 1} onClick={async()=>{
          const res = await UpdataUserApi({ id: entity._id , status: entity.status === 1 ? 0 : 1})
          if(res.data.code === 200){
            location.reload()
          }
        }}></Switch>
  
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      width: 150,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 150,
    },
   
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row, index, action) => [
        <a
          key="a"
          onClick={() => {
            action?.startEditable(row._id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
 

  return (
    <>
    <ProTable<TableListItem>
      columns={columns}
      request ={async (param: { pageSize?: number; current?: number; keyword?: string ;[key :string]:any}) => {
        console.log(param)
        const res = await getUserListApi({
          ...params,
          username:param.username,
          password:param.password,
          creator:param.creator,
        });
        const data = res.data.data.list.map(user => ({
          ...user,
          status: user.status ?? 1, // 假设默认状态为 1
        })) as TableListItem[];
      
        return {
          data,
          success: true,
          total: res.data.data.total,
        };
      }}
      pagination={{
        pageSizeOptions: [5, 10, 20, 50],
        pageSize: params.pagesize,
        onChange: (page,pagesize) => {
          setParams({
            page,
            pagesize
          })
        }
      }}
    />
  </>
  )
}

export default UserOptions

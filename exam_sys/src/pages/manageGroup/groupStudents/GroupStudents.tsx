

import React, { useEffect ,useState} from 'react'
import { studentListApi,updateStudentListApi } from '../../../services/manageGroup/groupStudents'
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Space } from 'antd';
import dayjs from 'dayjs';

interface StudentItem {
  age:number
  classId:string
  className:string
  avator:string
  createTime:number
  creator:string
  email:string
  exams:any[]
  lastOnlineTime:number
  password:string
  role:string
  sex:string
  status:0 | 1
  username: string
  __v:number
  _id:string
} 



const columns: ProColumns<StudentItem>[] = [
  {
    title: '排序',
    width: 100,
    dataIndex: 'index',
    key: 'indexBorder',
    valueType: 'indexBorder',
  },
  {
    title: '姓名',
    width: 120,
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '性别',
    width: 80,
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '年龄',
    width: 80,
    dataIndex: 'age',
    key: 'age',
  },
 
  {
    title: '班级',
    width: 120,
    dataIndex: 'className',
    key: 'className',
  },
  
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width:220,
    editable: false,
    render(dom, entity, index, action, schema) {
      return dayjs(entity.createTime).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="a"
        style={{color:'#1890ff'}}
        onClick={() => {
          action?.startEditable(row._id);
        }}
      >
        编辑
      </a>,
    ],
  },
];



const GroupStudents = () => {
  const [param, setParam] = useState<{page: number, pagesize: number}>({page:1,pagesize:5})

  return (
    <>
     <ProTable<StudentItem>
      columns={columns}
      request={async(params) => {
        const res = await studentListApi({
          ...param,
          username:params.username,
          sex:params.sex,
        })
        return Promise.resolve({
          total: res.data.data.total,
          data: res.data.data.list,
          success: true,
        });
      }}
      rowKey="_id"
      headerTitle="学生列表"
      pagination={{
        pageSize:param.pagesize,
        pageSizeOptions:[5,10,15,20],
        onChange(page, pageSize) {
          setParam({page, pagesize:pageSize})
        },
      }}
      editable={{
        type: 'multiple',
        onSave: async(key, record, originRow) => {
          const res = await updateStudentListApi({
            id:record._id,
            age: Number(record.age),
            className:record.className,
            sex:record.sex as '男' | '女',
            username:record.username,
          })
          if( res.data.code === 200){
            message.success('修改成功')
          }
         
        },
      }}
    />
    </>
  )
}

export default GroupStudents

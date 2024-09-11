


import React, { useEffect, useState } from 'react'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag ,Form, message} from 'antd';
import { useRef } from 'react';
import { studentGroupList,updateStudentGroupListApi } from '../../../services/groupList/GroupList'
import { useForm } from 'antd/es/form/Form';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  valueType:string
  dataIndex:string
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  _id: string;

  name: string; // 班级名称
  teacher: string; // 老师
  classify: string; // 科目类别
  createTime: string; // 创建时间
};


const GroupList = () => {
  const actionRef = useRef<ActionType>();
  const [form] =  Form.useForm()
  const [pageParam, setPageParam] = useState({
    page: 1,
    pageSize:5
  })

  // const getListApi = async () => {
  //   const res = await studentGroupList({page:1,pagesize:5})
  //   console.log(res.data.data.list)
  //   // return res.data.data.list
  //   setDate(res.data.data.list)
  //   console.log(data)
  // }

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '班级名称',
      key: 'name',
      dataIndex: 'name',
      valueType: 'text',
      width: 100,
      // copyable: true, // 是否支持复制
      // ellipsis: true, //是否自动缩略
      // sorter: true, //是否支持复制
      // hideInSearch: true,//在查询表单中不展示此项	
    },
    {
      title: '老师',
      key: 'teacher',
      dataIndex: 'teacher',
      valueType: 'text',
      // sorter: true,
      hideInSearch: true,
    },
    {
      title: '科目类别',
      key: 'classify',
      dataIndex: 'classify',
      valueType: 'text',
      // sorter: true,
      hideInSearch: true,
    },

    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      // sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
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


  return (
    <>
    <ProTable<GithubIssueItem>
      rowKey='_id'
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // form={form}
      request={async (params, sort, filter) => {
        await waitTime(2000);
       
        const res = await studentGroupList({
          page: pageParam.page as number,
          pagesize: pageParam.pageSize as number,
        });
        console.log('数据', res.data.data.list[0]);
        return {
          data: res.data.data.list,
          success: true,
          total: res.data.data.total,
        };
      }}
      
      editable={{
        type: 'multiple',
        onSave: async (key, row, originRow) =>{
          const res = await updateStudentGroupListApi({
            id: key as string,
            name: row.name,
            teacher: row.teacher,
            classify: row.classify,
            createTime: Number(row.createTime) as number,
          })
          if(res.data.code === 200){
            message.success('修改成功')
          }
        }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('11111')
          console.log('value: ', value);
        },
      }}
      // rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}

      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          console.log(values)
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
        onChange:(...res)=>{
          console.log(res)
        }
      }}
      pagination={{
        pageSizeOptions: [5, 10, 20, 50],
        pageSize: pageParam.pageSize,
        onChange: (page,pageSize) => {
          setPageParam({
            page,
            pageSize
          })
        }
      }}

      dateFormatter="string"
      headerTitle="班级列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '2',
              },
              {
                label: '3rd item',
                key: '3',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
    </>
  )
}

export default GroupList

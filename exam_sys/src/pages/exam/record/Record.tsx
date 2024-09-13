

import React, { useEffect,useState } from 'react'

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space,Select, Tag ,Drawer } from 'antd';
import { useRef } from 'react';
import dayjs from 'dayjs'
import { examinationListApi } from '../../../services/exam/record';

import Analysis from './Analysis';

export interface ListItem {
  classify:string
  createTime:number
  creator:string
  endTime:number
  examId:string
  examiner:string[]
  group:any[]
  name:string 
  startTime:number
  status:1 | 0
  __v:number
  _id:string
  questionsList:{
    answer:string
    classify:string
    desc:string
    question:string
    type:string
    __v:number
    _id:string
    options:string[]
  }[]

}
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

const statusOptions = [
  { label: '进行中', value: 1 },
  { label: '已结束', value: 0 },
];



const Record = () => {
  const actionRef = useRef<ActionType>();
  const [param,setParam] = useState({page:1, pagesize:10})

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemList, setItemList] = useState<ListItem | null>(null)
  const [analysisShow, steAnalysisShow] = useState<boolean>(false)
  const [showId, setShowId] = useState<string>('')


  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const columns: ProColumns<ListItem>[] = [
    {
      title: '考试名称',
      dataIndex: 'name',
      width: 100,
      ellipsis: true,
      key:'name',
      fixed: 'left',
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      width: 80,
      key:'classify'
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      width: 80,
      key:'creator'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      key:'createTime',
      render:(_, record) => {
        return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    
    {
      title: '状态',
      dataIndex: 'status',
      width: 50,
      key:'status',
      valueType: 'select', // 指定值为选择类型
      fieldProps: {
        options: statusOptions, // 定义下拉选项
      },
      search: {
        // 定义搜索表单的行为
        transform: (value) => {
          // 这里可以对搜索值进行转换，如果需要的话
          return value;
        },
      },
      render: (_, record) => {
        return record.status === 1 ? '进行中' : '已结束';
      },
    },
    {
      title: '监考人',
      width: 100,
      key:'examiner',
      render:(_, record) => {
        return record.examiner.map((item, index) => {
          return (
            <Tag key={index} color="blue">
              {item}
            </Tag>
          );
        })
      }
    },
    {
      title: '开始时间',
      width: 150,
      key:'startTime',
      render:(_, record) => {
        return dayjs(record.startTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '结束时间',
      width: 150,
      key:'endTime',
      render:(_, record) => {
        return dayjs(record.endTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
   
    {
      title: '操作',
      width: 220,
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      render: (text, record, _, action) => [
       <>
        <Button type="primary" ghost  onClick={()=>{
          showLoading()
          setItemList(record)
        }}>
        预览试卷
        </Button>
        <Button disabled>
        删除
        </Button>
        <Button type="primary" ghost onClick={()=>{
          steAnalysisShow(true)
          setShowId(record._id)
        }}>
        成绩分析
        </Button>
       </>
      ],
    },
  ];

  return (
   <>
   {!analysisShow ? 
    (<><ProTable<ListItem>
      columns={columns}
      actionRef={actionRef}
      scroll={{ x: 1300 }}
      cardBordered
      request={async (params, sort, filter) => {
        await waitTime(2000);
        const res = await examinationListApi({...param,
          classify:params.classify,
          name:params.name,
          startTime:params.startTime,
          endTime:params.endTime,
          status:params.status,
        })
        return {
          data: res.data.data.list,
          total: res.data.data.total,
          success: true,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="_id"
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
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: param.pagesize,
        onChange: (page,pagesize) => setParam({page:page, pagesize:pagesize}),

      }}
      dateFormatter="string"
      headerTitle="考试记录"
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
     <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        {JSON.stringify(itemList)}
     </Drawer></>)
    :
     <Analysis id={showId} steAnalysisShow={steAnalysisShow}></Analysis>
    }
   </>
  )
}

export default Record

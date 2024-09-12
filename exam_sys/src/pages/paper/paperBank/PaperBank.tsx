

import React,{useState} from 'react'
import { examListApi, updateExamListApi,removeExamListApi, detailExamListApi } from '../../../services/paper/paperBank'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Popconfirm ,message,Drawer } from 'antd';
import { useRef } from 'react';
import dayjs from 'dayjs';


interface ListItem {
  classify:string
  createTime:number
  creator:string
  namez:string
  _id:string
  __v:number
  questions:string[]
}

interface DeatilItem {
  classify:string
  createTime:number
  creator:string
  name:string
  _id:string
  __v:number
  questions?:{
    answer:string
    classify:string
    question:string
    type:string
    _id:string
    __v:number
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






const PaperBank = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<DeatilItem | null>(null)
  const [param, setParam] = useState<{page:number, pagesize:number}>({page: 1, pagesize: 5})
  const [serial, setSerial ] = useState(['A','B','C','D'])


  React.useEffect(() => {
    examListApi({page: 1, pagesize: 10})
    .then(res => {
      console.log(res.data.data.list)
    })
  }, [])
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const columns: ProColumns<ListItem>[] = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: '科目类型',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      key: 'createTime',
      search:false,
      editable: false,
      render(dom, entity, index, action, schema) {
        return <span>{dayjs(entity.createTime).format('YYYY-MM-DD')}</span>;
      },
    },
  
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <>
          <Button
          key="editable"
          type='primary'
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          编辑
        </Button>
        <Popconfirm
        title="确认删除"
        onConfirm={async()=>{
          const res = await removeExamListApi({id: record._id})
          if(res.data.code === 200){
            message.success('删除成功')
          }
        }}
        okText="删除"
        cancelText="取消"
      >
        <Button danger>删除</Button>
      </Popconfirm>

        <Button type="dashed" onClick={async()=>{
          showDrawer()
          const res = await detailExamListApi({id: record._id})
          if(res.data.code === 200){
            setDetail(res.data.data)
            console.log('222222222',detail)
          }
        }}>
        预览试卷
      </Button>
        </>
      ],
    },
  ];

  return (
    <>
     <ProTable<ListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params,sort, filter) => {
        const res = await examListApi({...param,
           name: params?.name,
           creator: params?.creator,
           classify: params?.classify})
           return Promise.resolve({
            data: res.data.data.list,
            total: res.data.data.total,
            success: true,
          })
      }}
      editable={{
        type: 'multiple',
        onSave:async(key, record) => {
          console.log(record)
          const res = await updateExamListApi({...record, id: record._id})
          if(res.data.code === 200){
            message.success('修改成功')
          }
        },
        onDelete: async(key, record) => {
          const res = await removeExamListApi({id: record._id})
          if(res.data.code === 200){
            message.success('删除成功')
          }
        },

      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value:111111111 ', value);
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
      pagination={{
        pageSize: param.pagesize,
        pageSizeOptions: [5, 10, 15,20],
        showSizeChanger: true,
        onChange: (page,pagesize) => {
          setParam({ page: page, pagesize: pagesize })
        }
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
      <Drawer title="试卷内容" width={800} onClose={onClose} open={open}>
        <h2>{detail?.name}</h2>
        <h5>{detail?.classify}</h5>
        <h3>单选</h3>
        {detail?.questions!.map((item, ind) => 
          
         item && (
         item.type === '3' &&  <div style={{marginBottom:10}}>
          <p style={{fontSize:20}}> {ind+1}:{item?.question}</p>
          <Space style={{fontSize:18}}>{item?.options.map((v,index) => <span>{serial[index]}:{v}</span>)}</Space>
         </div>
        )
        )}
         <h3>多选</h3>
        {detail?.questions!.map((item, ind) => 
         item && (
         item.type !== '3' &&  <div style={{marginBottom:10}}>
          <p style={{fontSize:20}}> {ind+1}:{item?.question}</p>
          <Space style={{fontSize:18}}>{item?.options.map((v,index) => <span>{serial[index]}:{v}</span>)}</Space>
         </div>
        )
        )}
      </Drawer>
    </>
  )
}

export default PaperBank

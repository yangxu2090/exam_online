



import React, { useEffect,useState,useRef } from 'react'
import { examinationDetailApi } from '../../../services/exam/record'
import type { ListItem } from './Record'
import { Space,Button,Descriptions  } from 'antd'
import dayjs from 'dayjs'
import { Line,Funnel  } from '@ant-design/charts'

import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'


interface Props {
  id: string
  steAnalysisShow: (n:boolean) => void
}



const Analysis:React.FC<Props> = (props) => {
  const [itemData, setItemData] = useState<ListItem | null>(null)
  const {id , steAnalysisShow} = props
  const [show, setShow] = useState(true)
  useEffect(()=>{
    examinationDetailApi({id})
    .then(res => {
      setItemData(res.data.data)
    })
    .catch(error => {
      console.error('Error fetching examination details:', error);
    })
  },[id])

  const data1 = [
    {
      action: '总分',
      pv: 100,
    },
    {
      action: '最高分',
      pv: 100,
    },
    {
      action: '最低分',
      pv: 52,
    },
    {
      action: '平均分',
      pv: 85,
    },
  ];
  
  const config1 = {
    data: data1,
    xField: 'action',
    yField: 'pv',
    transpose: true,
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '单选题',
      children: <Funnel {...config1} />
    },
    {
      key: '2',
      label: '多选题',
      children:<Funnel {...config1} />
    },
    {
      key: '3',
      label: '填空题',
      children: <Funnel {...config1} />
    },
  ];


  const data = [
    { year: '总分', value: 100 },
    { year: '最低分', value: 52 },
    { year: '平均分', value: 82 }, 
    { year: '最高分', value: 100 },
  ];

  const config = {
    data,
    title: {
      visible: true,
      text: '曲线折线图',
    },
    description: {
      visible: true,
      text: '用平滑的曲线代替折线\u3002',
    },
    padding: 'auto',
    forceFit: true,
    xField: 'year',
    yField: 'value',
  };

  return (
   <>
    <Space>
      <Button type="link" onClick={()=>steAnalysisShow(false)}>返回上一页</Button>
      <Button type="primary" onClick={()=>setShow(true)}>成绩统计</Button>
      <Button type="primary" onClick={()=>setShow(false)}>试题分析</Button>
    </Space>
     {itemData  && ( <Descriptions title={itemData?.name}>
        <Descriptions.Item label="考试时间">{dayjs(itemData?.startTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        <Descriptions.Item label="考试分类">{itemData?.classify}</Descriptions.Item>
        <Descriptions.Item label="总分">100</Descriptions.Item>
        <Descriptions.Item label="平均分">82</Descriptions.Item>
        <Descriptions.Item label="最高分">100</Descriptions.Item>
        <Descriptions.Item label="最低分"> 52 </Descriptions.Item>
      </Descriptions>)}

      <div  style={{width:'100%',height:'30px'}}></div>
      { show ? 
        <Line {...config} />
        :
        <Collapse accordion items={items} />
      }
      
   </>
  )
}

export default Analysis





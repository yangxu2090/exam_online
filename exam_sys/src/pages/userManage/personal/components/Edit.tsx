






import React, { useState } from 'react';
import {  Space,Button, Descriptions ,Avatar  } from 'antd';
import type { DescriptionsProps } from 'antd';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store/index'

interface Params {
  onchange: () => void
}


const Edit: React.FC<Params>  = (props) => {
  const userInfo = useSelector((state:RootState ) => state.user)


  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户',
      children: userInfo.username
    },
    {
      key: '2',
      label: '性别',
      children: userInfo.sex || '--'
    },
    {
      key: '3',
      label: '邮箱',
      children: userInfo.email || '--'
    },
    {
      key: '4',
      label: '年龄',
      children: userInfo.age || '--'
    },
    {
      key: '5',
      label: '用户id',
      children: userInfo._id || '--'
    },
  ];
  



  return (
   <>
    <Descriptions title={ <Avatar
    size={100}
    src={userInfo.avator || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'}
  />} items={items} />

   <div style={{marginTop:'20px'}}>
   <Space>
     <Button type="primary" size="large" onClick={props.onchange}>点击编辑</Button>
    </Space>
   </div>
   </>
  )
}

export default Edit

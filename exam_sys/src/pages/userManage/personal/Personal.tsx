




import React, { useState } from 'react';
import {  Space,Button, Descriptions ,Avatar  } from 'antd';
import type { DescriptionsProps } from 'antd';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/index'
import Edit from './components/Edit'
import Modify from './components/Modify'


const Personal: React.FC  = () => {
  const [showEdit, setShowEdit] = useState(true)



  return (
   <>
   {showEdit 
   ? <Edit onchange={()=>setShowEdit(false)}></Edit> 
   : <Modify oncancel={()=>setShowEdit(true)}></Modify>}
    
   </>
  )
}

export default Personal

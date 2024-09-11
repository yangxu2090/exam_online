

import React from 'react'
import { Button } from 'antd'


import Powerbtn from '../../power/Powerbtn'

const GroupClass = () => {

  return (
    <div>
      <h1>group-class</h1>
      <Powerbtn powerBtn={'groupDelBtn'}>
      <Button type="primary">删除班级按钮</Button>
      </Powerbtn>
    </div>
  )
}

export default GroupClass

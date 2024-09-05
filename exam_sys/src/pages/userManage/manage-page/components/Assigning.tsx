



import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { Select, Space ,message} from 'antd';
import type { SelectProps } from 'antd';
import { UpdataUserApi} from '../../../../services/userManage/userList'


const options: SelectProps['options'] = [];
const optionsValue = ['主任','任桑','老师','管理员','校长','qsq','搜索']
for (let i = 0; i < optionsValue.length; i++) {
  options.push({
    label: optionsValue[i],
    value:optionsValue[i],
  });
}


interface Props {
  isAssigning: boolean,
  setIsAssigning:(n:boolean) => void,
  id: string,
  role:string[]
}

const Assigning:React.FC<Props> = (props) => {
  const [role, setRole] = useState<string[]>(props.role)

  const  change = async() => {
    try{
      const res = await UpdataUserApi({role, id:props.id})
      if(res.data.code === 200){
        message.success('分配角色成功')
        props.setIsAssigning(false)
      }else{
        message.error(res.data.msg)
      }
    }catch(e){
      message.error(`数据异常${e}`)
    }
  }

  const handleChange = (value: string[]) => {
    // console.log(`selected ${value}`);
    setRole(value)
  };
  

  return (
    <>
       <Modal title="分配角色" 
        open={props.isAssigning} 
        onOk={()=>change()} 
        onCancel={()=>props.setIsAssigning(false)} 
        >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={role}
          onChange={handleChange}
          options={options}
        />
      </Modal>
    </>
  )
}

export default Assigning





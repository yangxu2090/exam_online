


import React,{useEffect, useState} from 'react'
import { Button, Drawer, message } from 'antd';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { permissionMenuApi } from '../../../../services/userManage/systemPermission'
// import type { Menulist } from '../../../../type/services/login'
import { updatePermissionMenuApi } from  '../../../../services/userManage/systemPermission'
interface Props {
  open: boolean
  setOpen:(n:boolean) => void
  showLoading: () => void
  loading:boolean
  curRow:string[]
  curRowId:{id:string, name: string}
}

// 角色列表
export type RoleItem = {
  createTime: number
  creator: string
  disabled: boolean
  name: string
  permission: string[]
  value: string
  _id: string
}

type CheckedPer = {
  checked: string[]
  halfChecked: string[]
}




const Distribution:React.FC<Props> = (props) => {

  const [checkedKeys, setCheckedKeys] = useState<CheckedPer>({
    checked: [],
    halfChecked: []
  }
);
  const [menuList, setMenuList] = useState<RoleItem[]>([])





  useEffect(()=>{
    permissionMenuApi()
      .then(res => {
        setMenuList(res.data.data.list)
        const obj: CheckedPer = {
          checked: [],
          halfChecked: []
        }
        props.curRow.forEach(id => {
          // 遍历当前行的权限，判断此权限是不是第一级权限
          const first = res.data.data.list.find((item:any) => item._id === id)
          console.log('first',first)
          if (first) {
            // 如果是第一级权限，并且所有子权限都在当前权限内，表示当前权限可以全选
            if (first.children.every((v :any)=> props.curRow.includes(v._id))) {
              obj.checked.push(id)
            } else {
              obj.halfChecked.push(id)
            }
          } else {
            obj.checked.push(id)
          }
        })
        setCheckedKeys(obj)
      })
      .catch(err => {
        console.log('数据获取异常', err)
      })
  },[])

 

  const handler = async() => {
    const res = await updatePermissionMenuApi({
      ...props.curRowId,
      permission:checkedKeys.halfChecked.concat(checkedKeys.checked)
    })
    if(res.data.code === 200){
      message.success('修改成功')
      props.setOpen(false)
    }
  }



  return (
  <>
  <Drawer
    closable
    destroyOnClose
    title={<p>分配角色</p>}
    placement="right"
    open={props.open}
    loading={props.loading}
    onClose={() => props.setOpen(false)}
    footer={<Button type="primary" onClick={handler}>确定</Button>}
      >
     <Tree
      checkable
      defaultExpandAll
      treeData={menuList}
      checkedKeys={checkedKeys}
      onCheck={(checked: any, obj: any) => {
        setCheckedKeys({
          checked,
          halfChecked: obj.halfCheckedKeys
        })
      }}
      fieldNames={{
        key: '_id',
        title: 'name'
      }}

    />
  </Drawer>
  
  </>
  )
}

export default Distribution

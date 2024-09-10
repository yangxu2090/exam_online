


import React,{useEffect, useState} from 'react'
import { Button, Drawer, message } from 'antd';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { permissionMenuApi } from '../../../../services/userManage/systemPermission'
import type { Menulist } from '../../../../type/services/login'
import { updatePermissionMenuApi } from  '../../../../services/userManage/systemPermission'
interface Props {
  open: boolean
  setOpen:(n:boolean) => void
  showLoading: () => void
  loading:boolean
  curRow:string[]
  curRowId:{id:string, name: string}
}



const Distribution:React.FC<Props> = (props) => {

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(props.curRow);
  const [menuList, setMenuList] = useState<TreeDataNode[]>([])
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {

    setCheckedKeys(checkedKeysValue as React.Key[]);
  };


  useEffect(()=>{
    permissionMenuApi()
      .then(res => {
        const temp = res.data.data.list.map((item: Menulist) => {
            return {
              title:item.name,
              key:item._id,
              children:item.children.map(v => {
                return {
                  title:v.name,
                  key:v._id
                }
              })
            }
        })
        setMenuList(temp)
      })
      .catch(err => {
        console.log('数据获取异常', err)
      })
  },[])

  const handler = async() => {
    const res = await updatePermissionMenuApi({
      ...props.curRowId,
      permission:checkedKeys as string[]
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
      defaultCheckedKeys={props.curRow}
      defaultExpandAll={true}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={menuList}
    />
  </Drawer>
  
  </>
  )
}

export default Distribution

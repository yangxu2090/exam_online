import React, { useEffect, useState } from 'react';
import {  useNavigate,useLocation } from 'react-router-dom';
import { useInfoApi } from '../services/login/login'
import { setUserInfo } from '../store/models/user'
import { useDispatch ,useSelector } from 'react-redux';
import { message } from 'antd'
import { PageContainer, ProCard, ProLayout,ProConfigProvider } from '@ant-design/pro-components';
import {
  LogoutOutlined
} from '@ant-design/icons';
import {
  Dropdown,
  Spin 
} from 'antd';

import type { RootState } from '../store'
import { Suspense } from 'react'
import ProSkeleton from '@ant-design/pro-skeleton';
import { menulistApi } from '../services/login/login'
import type { Menulist } from '../type/services/login'
interface AuthProps {
  children: React.ReactNode;
}
const Layout:React.FC<AuthProps> = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userInfo = useSelector((state: RootState) => state.user)
  const [loding, setLoding] = useState(false)
  const [meulist, setMeulist] = useState<Menulist[]>([])
  useEffect(()=>{
    setLoding(true)
    useInfoApi()
     .then(res => {
      if(res.data.code === 200){
        dispatch(setUserInfo(res.data.data))
        setLoding(false)
      }
     }).catch(e => {
      if(e.status === 401){
        message.error(e.response.data)
        navigate('/login')
      }else{
        message.error('请求失败')
      }
      setLoding(true)
     })
  },[])

  useEffect(()=>{
    menulistApi()
      .then(res => {
        const meuli = res.data.data.list.map((item:Menulist)  => {
          return {
            ...item,
            routes:item.children
          }
        })
        setMeulist(meuli)
      })
      .catch(e => {
        console.log(e)
      })
  },[])


  if(loding) return <Spin />

  return  (
    
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          title="online"
          logo="https://cn.redux.js.org/img/redux.svg"
          prefixCls="my-prefix"
          route = {{
            path: '/',
            routes: [
              {
                path: '/',
                name: '欢迎',
              },
              ...meulist
            ],
          }}
          location={{
            pathname: location.pathname,
          }}
          token={{
            header: {
              colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
            },
          }}
          siderMenuType="group"
          menu={{
            collapsedShowGroupTitle: true,
          }}
          avatarProps={{
            src: userInfo.avator || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: userInfo.username,
            render: (props, dom) => {
              return (
                <Dropdown
                 
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                        onClick:()=>{
                          localStorage.removeItem('token')
                          navigate('/login')
                        }
                      },
                      {
                        key: 'useInfo',
                        icon: <LogoutOutlined />,
                        label: '个人信息',
                        onClick:()=>{
                            navigate('/userManage/personal')
                        }
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          menuItemRender={(item, dom, props) => (
            <div
              onClick={() => {
                const cur = props.route?.routes.find((v:any) => v.path === item.path)
                if (cur?.routes) {
                  navigate(cur?.routes[0].path)
                } else {
                  navigate(item.path!)
                }
              }}
            >
              {dom}
            </div>
          )}
          fixSiderbar={true}
          layout="mix"
          splitMenus={true}
        >
          <PageContainer>
            <ProCard
              style={{
                minHeight: 800,
              }}
            >
               <Suspense fallback={<div
        style={{
          background: '#fafafa',
          padding: 24,
        }}
      >
        <ProSkeleton type="list" />
    </div>}>
      {props.children}
          </Suspense> 
            </ProCard>
          </PageContainer>
        </ProLayout>
      </ProConfigProvider>
    </div>
  );

};

export default Layout;








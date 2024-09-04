import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useInfoApi } from '../services/login/login'
import { setUserInfo } from '../store/models/user'
import { useDispatch  } from 'react-redux';
import { message } from 'antd'
import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';
import defaultProps from './_defaultProps';


interface AuthProps {
  children: React.ReactNode;
}

const Layout:React.FC<AuthProps> = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  useEffect(()=>{
    useInfoApi()
     .then(res => {
      console.log(res.data)
      if(res.data.code === 200){
        dispatch(setUserInfo(res.data.data))
      }
     }).catch(e => {
      if(e.status === 401){
        message.error(e.response.data)
        navigate('/login')
      }else{
        message.error('请求失败')
      }
     })
  },[])


  return  (<div
  id="test-pro-layout"
  style={{
    height: '100vh',
  }}
>
  <ProLayout
    siderWidth={216}
    bgLayoutImgList={[
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ]}
    {...defaultProps}
    location={{
      pathname,
    }}
    avatarProps={{
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      title: '七妮妮',
      size: 'small',
    }}
   
    menuItemRender={(item, dom) => (
      <div
        onClick={() => {
          setPathname(item.path || '/welcome');
        }}
      >
        {dom}
      </div>
    )}
  >
    <PageContainer>
      <ProCard
        style={{
          height: '100vh',
          minHeight: 800,
        }}
      >
        {props.children}
        <div />
      </ProCard>
    </PageContainer>
  </ProLayout>
</div>
)
};

export default Layout;








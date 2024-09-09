


import React from 'react'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormText,
} from '@ant-design/pro-components';
import { 
  Button,
  Tabs, 
  theme , 
  message
} from 'antd';
import type { FormProps  } from 'antd';
import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import style from './Login.module.scss'
import { getLoginCaptcha, getLogin } from '../../services/login/login'
import { useNavigate } from 'react-router-dom';




type LoginType = 'phone' | 'account';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  code?:string;
};

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};




const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();
  const [img,setImg] = useState<string>('')
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>['onFinish'] = ({username, password,code} ) => {
    getLogin({
      username:username as string,
      password: password as string,
      code: code as string
    }).then(res => {
      console.log(res)
      if(res.data.code !== 200){
        message.error(`${res.data.msg}`)
        getCaptchas()
      }
      message.info('登录成功')
      // const obj = {
      //   token:res.data.data.token,
      //   expires: 600000
      // }
      localStorage.setItem('token', res.data.data.token)
      navigate('/')
    })
  }
  
  const getCaptchas = async() => {
    try{
      const res = await getLoginCaptcha()
      if(res.data.code === 200){
        setImg(res.data.data.code)
      }else{
        message.error(res.data.msg)
      }
    }catch(e){
      message.error(`数据异常${e}`)
    }
  }


  useEffect(()=>{
    getCaptchas()

  },[])



  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Github"
        containerStyle={{
          // backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        onFinish={onFinish}
        subTitle="全球最大的代码托管平台"
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(4px)',
          },
          title: '活动标题，可配置图片',
          subTitle: '活动介绍说明文字',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              去看看
            </Button>
          ),
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >

          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'老师登录'} />
          <Tabs.TabPane key={'phone'} tab={'学生登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名: root'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码: 123'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
              <div className={style.codeItem}>
              <ProFormText
              name="code"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'验证码: xxxx'}
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              
            />
            <Button onClick={getCaptchas}><img src={img} alt="" /></Button>
              </div>
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名: root'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码: 123'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
              <div className={style.codeItem}>
              <ProFormText
              name="code"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'验证码: xxxx'}
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              
            />
            <Button onClick={getCaptchas}><img src={img} alt="" /></Button>
              </div>
          </>
        )}
       
      </LoginFormPage>
    </div>
  );
}

export default Login

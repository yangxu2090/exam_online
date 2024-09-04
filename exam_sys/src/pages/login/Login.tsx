


import React from 'react'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { 
  Button,
  Divider, 
  Space, 
  Tabs, 
  message, 
  theme , 
  Form,
  Checkbox,
  Input,
  Tag  
} from 'antd';
import type { FormProps } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import style from './Login.module.scss'

type LoginType = 'phone' | 'account';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};




const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();
  
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
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
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
            <Button >图片</Button>
              </div>
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
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
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
       
      </LoginFormPage>
    </div>
  );
}

export default Login

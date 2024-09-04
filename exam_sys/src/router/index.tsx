import { Navigate, Link } from "react-router-dom";
import { Button, Result } from 'antd';
import React from 'react';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';

// 定义路由配置的接口
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  title?: string;
  isAuth?: boolean;
  children?: RouteConfig[];
}

const routers: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">回到首页</Button>
        </Link>
      }
    />
  }
];

// interface TitleComProps {
//   title?: string;
//   isAuth?: boolean;
//   children: React.ReactNode;
// }

// const TitleCom = (props: TitleComProps) => {
//   if (props.title) {
//     document.title = props.title;
//   }
//   if (props.isAuth) {
//     return <Auth>{props.children}</Auth>;
//   }
//   return <>{props.children}</>;
// };

// // 定义 formatRoutes 函数的类型
// const formatRoutes = (routeConfig: RouteConfig[]) => routeConfig.map((item: RouteConfig) => {
//   return {
//     path: item.path,
//     element: (
//       <TitleCom title={item.title} isAuth={item.isAuth}>
//         {item.element}
//       </TitleCom>
//     ),
//     children: item.children ? formatRoutes(item.children) : undefined,
//   };
// });

// export default formatRoutes(routers);
export default routers
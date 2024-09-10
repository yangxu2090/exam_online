import { Navigate, Link } from "react-router-dom";
import { Button, Result } from 'antd';
import React,{lazy} from 'react';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Auth from '../comenpents/auth/Auth'
// import ManagePage from '../pages/userManage/manage-page/ManagePage'
// import MenuManage from '../pages/userManage/menuManage/MenuManage'
// import Personal from '../pages/userManage/personal/Personal'
// import System from '../pages/userManage/system/System'
// import UserOptions from '../pages/userManage/userOptions/UserOptions'

//系统管理路由
const ManagePage = lazy(()=> import('../pages/userManage/manage-page/ManagePage'))
const MenuManage = lazy(()=>import('../pages/userManage/menuManage/MenuManage'))
const Personal = lazy(()=>import('../pages/userManage/personal/Personal'))
const System = lazy(()=>import('../pages/userManage/system/System'))
const UserOptions = lazy(()=>import('../pages/userManage/userOptions/UserOptions'))


//考试管理路由
const Create = lazy(()=>import('../pages/exam/create/Create'))
const Record = lazy(()=>import('../pages/exam/record/Record'))

// 班级管理路由
const GroupStudents = lazy(()=>import('../pages/manageGroup/groupStudents/GroupStudents'))
const GroupList = lazy(()=>import('../pages/manageGroup/groupList/GroupList'))
const GroupDetail = lazy(()=>import('../pages/manageGroup/groupDetail/GroupDetail'))
const GroupClass = lazy(()=>import('../pages/manageGroup/groupClass/GroupClass'))


// 试题路由
const CreateItem = lazy(()=>import('../pages/question/createItem/CreateItem'))
const ItemBank = lazy(()=>import('../pages/question/itemBank/ItemBank'))

// 试卷路由
const CreatePaper = lazy(()=>import('../pages/paper/createPaper/CreatePaper'))
const PaperBank = lazy(()=>import('../pages/paper/paperBank/PaperBank'))





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
    path: '/paper/create-paper',
    element: <CreatePaper />
  },
  {
    path: '/paper/paper-bank',
    element: <PaperBank />,
  },

  {
    path: '/question/create-item',
    element: <CreateItem />,
  },
  {
    path: '/question/item-bank',
    element: <ItemBank />,
  },









  {
    path: '/manage-group/group-students',
    element: <GroupStudents />,
  },
  {
    path: '/manage-group/group-list',
    element: <GroupList />,
  },
  {
    path: '/group-detail/:id',
    element: <GroupDetail />,
  },
  {
    path: '/manage-group/group-class',
    element: <GroupClass />,
  },










  {
    path: '/exam/create',
    element:<Create />,
  },
  {
    path: '/exam/record',
    element:<Record />,
  },


  {
    path: '/userManage/manage-page',
    element: <ManagePage />,
  },
  {
    path: 'userManage/personal',
    element: <Personal />,
  },
  {
    path: 'userManage/menuManage',
    element: <MenuManage />,
  },
  {
    path: 'userManage/system',
    element: <System />,
  },
  {
    path: 'userManage/userOptions',
    element:<UserOptions />,
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/403',
    element: <Result
      status="403"
      title="403"
      subTitle="抱歉没有该权限，请联系管理员"
      extra={
        <Link to="/">
          <Button type="primary">回到首页</Button>
        </Link>
      }
    />
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


// 定义 formatRoutes 函数的类型
const formatRoutes = (routers:RouteConfig[] ) => {
  return routers.map((item:RouteConfig) => {
   if(item.path !== '*' && item.path !== '/403' && item.path !== '/login' &&  item.path !== '/home' && item.path !== '/'){
    return {
      ...item,
      element:  <Layout><Auth>{item.element}</Auth></Layout>
    }
   }
   return item
  })
}

export default formatRoutes(routers)


// const routers: RouteConfig[] = [
//   {
//     path: '/',
//     element: <Navigate to="/home" replace />,
//   },
//   {
//     path: '/home',
//     element: <Layout><Home /></Layout>,
//   },

//   {
//     path: '/paper/create-paper',
//     element: <Layout><CreatePaper /></Layout>,
//   },
//   {
//     path: '/paper/paper-bank',
//     element: <Layout><PaperBank /></Layout>,
//   },

//   {
//     path: '/question/create-item',
//     element: <Layout><CreateItem /></Layout>,
//   },
//   {
//     path: '/question/item-bank',
//     element: <Layout><ItemBank /></Layout>,
//   },









//   {
//     path: '/manage-group/group-students',
//     element: <Layout><GroupStudents /></Layout>,
//   },
//   {
//     path: '/manage-group/group-list',
//     element: <Layout><GroupList /></Layout>,
//   },
//   {
//     path: '/group-detail/:id',
//     element: <Layout><GroupDetail /></Layout>,
//   },
//   {
//     path: '/manage-group/group-class',
//     element: <Layout><GroupClass /></Layout>,
//   },










//   {
//     path: '/exam/create',
//     element: <Layout><Create /></Layout>,
//   },
//   {
//     path: '/exam/record',
//     element: <Layout><Record /></Layout>,
//   },


//   {
//     path: '/userManage/manage-page',
//     element: <Layout><ManagePage /></Layout>,
//   },
//   {
//     path: 'userManage/personal',
//     element: <Layout><Personal /></Layout>,
//   },
//   {
//     path: 'userManage/menuManage',
//     element: <Layout><MenuManage /></Layout>,
//   },
//   {
//     path: 'userManage/system',
//     element: <Layout><System /></Layout>,
//   },
//   {
//     path: 'userManage/userOptions',
//     element: <Layout><UserOptions /></Layout>,
//   },

//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/403',
//     element: <Result
//       status="403"
//       title="403"
//       subTitle="抱歉没有该权限，请联系管理员"
//       extra={
//         <Link to="/">
//           <Button type="primary">回到首页</Button>
//         </Link>
//       }
//     />
//   },
//   {
//     path: '*',
//     element: <Result
//       status="404"
//       title="404"
//       subTitle="Sorry, the page you visited does not exist."
//       extra={
//         <Link to="/">
//           <Button type="primary">回到首页</Button>
//         </Link>
//       }
//     />
//   }
// ];

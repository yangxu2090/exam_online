import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '欢迎',
        icon: <SmileFilled />,
      },
      {
        path: '/userManage',
        name: '系统管理',
        icon: <CrownFilled />,
        routes: [
          {
            path: '/userManage/system',
            name: '角色管理',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/menuManage',
            name: '权限管理',
            icon: <CrownFilled />,

          },
          {
            path: '/userManage/personal',
            name: '个人信息',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/userOptions',
            name: '用户',
            icon: <CrownFilled />,
          },
          {
            path: '/userManage/manage-page',
            name: '用户管理',
            icon: <CrownFilled />,
          },
        ],
      },
      {
        path: '/exam',
        name: '考试管理',
        icon: <SmileFilled />,
        routes:[
          {
            path: '/exam/record',
            name: '考试记录',
            icon: <CrownFilled />,
          },
          {
            path: '/exam/create',
            name: '考试记录',
            icon: <CrownFilled />,
          },
        ]
      },
      {
        path: '/manage-group',
        name: '班级管理',
        icon: <SmileFilled />,
        routes:[
          {
            path: '/manage-group/group-list',
            name: '班级列表',
            icon: <CrownFilled />,
          },
          {
            path: '/manage-group/group-students',
            name: '学生列表',
            icon: <CrownFilled />,
          },
          {
            path: '/manage-group/group-class',
            name: 'group-class',
            icon: <CrownFilled />,
          },
          {
            path: '/manage-group/group-detail',
            name: ':id',
            icon: <CrownFilled />,
          },
        ]
      },
      {
        path: '/question',
        name: '试题管理',
        icon: <SmileFilled />,
        routes:[
          {
            path: '/question/item-bank',
            name: '试题库',
            icon: <CrownFilled />,
          },
          {
            path: '/question/create-item',
            name: '添加试题',
            icon: <CrownFilled />,
          },
        ]
      },
      {
        path: '/paper',
        name: '试卷管理',
        icon: <SmileFilled />,
        routes:[
          {
            path: '/paper/paper-bank',
            name: '试卷库',
            icon: <CrownFilled />,
          },
          {
            path: '/paper/create-paper',
            name: '创建试卷',
            icon: <CrownFilled />,
          },
        ]
      },
    ],
  },
};
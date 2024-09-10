
import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
];

const MenuManage = () => {

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { dataIndex: 'date', key: 'date' },
      { dataIndex: 'name', key: 'name' },
      {
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      { dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown menu={{ items }}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: '菜单名称', dataIndex: 'name', key: 'name' },
    { title: '菜单路径', dataIndex: 'platform', key: 'platform' },
    { title: '权限类型', dataIndex: 'version', key: 'version' },
    { title: '创建时间', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '操作', dataIndex: 'creator', key: 'creator' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
    <Table
      columns={columns}
      expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
      dataSource={data}
    />
    </>
  )
}

export default MenuManage


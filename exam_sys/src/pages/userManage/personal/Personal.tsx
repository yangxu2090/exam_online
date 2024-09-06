




import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Space,Button } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { getUserListApi } from '../../../services/userManage/personal'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/index'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const Personal: React.FC  = () => {
  const userInfo = useSelector((state:RootState ) => state.user)

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        getUserListApi({id:userInfo._id,avatar:url })
        .then(res => {
          console.log(res)
        }).catch(e => {
          message.error(`图片上传异常${e}`)
        })
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
   <>
    <Space>
       <Flex gap="middle" wrap>
       <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/bwapi/profile"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
       </Flex>
    </Space>

      <p>用户名称：{userInfo.username}</p>
      <p>性别：{userInfo.sex}</p>
      <p>年龄：{userInfo.age}</p>
      <p>邮箱地址：{userInfo.email}</p>

   <div style={{marginTop:'20px'}}>
   <Space>
     <Button type="primary" size="large">点击编辑</Button>
    </Space>
   </div>
   </>
  )
}

export default Personal

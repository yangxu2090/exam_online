



import React,{useState, useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import type { RootState } from '../../../../store/index'
import type { FormProps } from 'antd';
import { Button, Select, Form, Input, InputNumber, Space, message,Upload } from 'antd';
import { updateUserInfoApi } from '../../../../services/userManage/personal'
import { setUserInfo } from '../../../../store/models/user'
import { useInfoApi } from '../../../../services/login/login'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import type { GetProp, UploadProps } from 'antd';


type FieldType = {
  username?: string;
  age?:number
  email?:string
  sex?:'男'|"女"
  avator?:string
};

interface Prosp {
  oncancel: () => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};




const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};





const Modify:React.FC<Prosp> = (props) => {
  const userInfo = useSelector((state:RootState ) => state.user)
  const dispatch = useDispatch()
  const [form] = Form.useForm()


  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

 
   // 上传图片时执行此函数
   const handleChange: UploadProps['onChange'] = (info) => {
    // 上传完成，把图片转成 base64 展示到页面
    getBase64(info.file as FileType, (url) => {
      setImageUrl(url)
      // form.setFieldValue('avator', url)
      form.setFieldValue('avator', 'https://q8.itc.cn/q_70/images03/20240827/897db59cd0c0469d8a3f26f6bb05acea.jpeg')
    })
  }


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  
  useEffect(()=>{
    setImageUrl(userInfo.avator)
  },[])



  const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    const id = userInfo._id as string;
     const res = await updateUserInfoApi({...values, id });
     if(res.data.code === 200) {
      message.success('修改成功')
      const res = await  useInfoApi()
      dispatch(setUserInfo(res.data.data))
      props.oncancel()
     }else{
      message.error(res.data.msg)
     }
  };
  

  return (
    <>
       <Form
       form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={userInfo}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      > 
        <Form.Item<FieldType>  name="avator" wrapperCol={{ offset: 4 }}>
          <Upload
         listType="picture-circle"
         showUploadList={false}
         beforeUpload={() => false}
         onChange={handleChange}
         style={{overflow:'hidden'}}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        </Form.Item>


        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="年龄"
          name="age"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType>
          label="邮箱"
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="性别"
          name="sex"
        >
          <Select  options={[{label:'男', value:'男'},{label:'女', value:'女'}]}/>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Space><Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={props.oncancel}>
            取消
          </Button></Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default Modify







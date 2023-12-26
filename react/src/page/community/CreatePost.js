import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PostApi from '../../service/PostApi';
import NavBar from '../../components/NavBar';
import {cropToSquareAndCompress} from "../../utils/imageUtils";

const CreatePost = () => {
    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState(null);


    const onFinish = async (values) => {
        try {
            await PostApi.createPost(values);
            // 发帖成功后，跳转到帖子列表页面或其他目标页面
            window.location.href='/community';
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const compressedBase64 = await cropToSquareAndCompress(file, 60);

        // 显示预览图
        setPreviewImage(compressedBase64);

        // 设置表单字段值
        form.setFieldsValue({ picture: compressedBase64 });
    };

    return (
        <>
            <NavBar />

            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-md items-center">
                    <h1 className="mb-4 text-xl text-center">发帖</h1>
                    <Form form={form} onFinish={onFinish}>
                        {/* 帖子标题 */}
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[{ required: true, message: '请输入帖子标题' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* 帖子内容 */}
                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[{ required: true, message: '请输入帖子内容' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        {/* 图片上传 */}
                        <Form.Item
                            label="图片"
                            name="picture"
                            rules={[{ required: true, message: '请上传图片' }]}
                        >
                            <div>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </Form.Item>
                        {/* 发布按钮 */}
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" className="text-black font-bold py-2 px-4 rounded">
                                发布帖子
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreatePost;

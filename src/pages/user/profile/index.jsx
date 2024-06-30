import React, { useState, useEffect } from 'react';
import axios from '../../../component/api/axios';
import { Form, Input, Button, Layout, notification } from 'antd';
import UserNavbar from '../../../component/navbar/user-nav';
import UserSidebar from '../../../component/sidebar/user-side';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;

const UserProfile = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = storedUserData.user?.id;

    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/users/${userId}`);
          form.setFieldsValue(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [form]);

  const onFinish = async (values) => {
    const { oldPassword, newPassword } = values;
    try {
      // API call to update password
      await axios.post('/users/change-password', {
        userId: JSON.parse(sessionStorage.getItem('userData')).user.id,
        oldPassword,
        newPassword
      });
      form.resetFields(['oldPassword', 'newPassword', 'confirm']);
      // Success notification
      notification.success({
        message: 'Password updated successfully!',
      });
    } catch (error) {
      // Error handling
      console.error('Error updating password:', error);
      notification.error({
        message: 'Failed to update password',
        description: 'Your old password may be incorrect or the server could be unreachable.'
      });
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <UserNavbar />
      <UserSidebar />
      <Content className="p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 mt-16 rounded-lg shadow">
          <h2 className="text-3xl font-bold text-center mb-6">Your Profile</h2>
          <Form form={form} onFinish={onFinish} layout="vertical">
            {/* Existing fields */}
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} disabled />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
            >
              <Input prefix={<HomeOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input prefix={<PhoneOutlined className="site-form-item-icon" />} />
            </Form.Item>

            {/* New password fields */}
            <Form.Item
              name="oldPassword"
              label="Old Password"
              rules={[{ required: true, message: 'Please input your old password!' }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: 'Please enter a new password!' }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfile;

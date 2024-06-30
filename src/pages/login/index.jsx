import React, { useEffect } from "react";
import { Form, Input, Button, notification, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "../../component/api/axios";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('userData');
    if (user) {
      const userData = JSON.parse(user);
      redirectUser(userData.user.role);
    }
  }, []);

  const redirectUser = (role) => {
    if (role === 'admin') {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/services");
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/login', values);
      if (response.data.status === 'success') {
      sessionStorage.setItem('userData', JSON.stringify(response.data.data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
         notification.success({
          message: `Welcome ${response.data.data.user.name}!`, // Lỗi có thể xảy ra ở đây
        });
        window.location.reload();
        redirectUser(response.data.data.user.role);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Login Failed:', error);
      notification.error({
        message: 'Login Failed',
        description: error.message || 'An error occurred during login',
      });
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-50 justify-center items-center">
    <div className="w-full max-w-xl px-12 py-10 bg-white shadow-2xl rounded-xl"> 
      <Typography.Title level={4} className="text-center text-gray-800 text-3xl mb-8"> 
        Welcome to our service! 👋🏻
      </Typography.Title>
      <Form
        name="normal_login"
        onFinish={onFinish}
        className="space-y-6" // Increased space
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" size="large"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large" // Adjusted input size
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full h-12 text-lg py-3 bg-blue-500 hover:bg-blue-500"> {/* Adjusted button size */}
            LOGIN
          </Button>
        </Form.Item>
        <div className="text-center text-base"> 
          Or <a href="/register" className="text-blue-500 hover:text-blue-800">register now!</a>
        </div>
      </Form>
    </div>
  </div>
  );
};

export default Login;

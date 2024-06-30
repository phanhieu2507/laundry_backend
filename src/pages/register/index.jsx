import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import axios from "../../component/api/axios";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/register", values);
      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered!",
      });
      // Redirect người dùng sau khi đăng ký thành công, ví dụ đến trang đăng nhập
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 justify-center items-center">
      <div className="w-full max-w-xl px-12 py-10 bg-white shadow-2xl rounded-xl">
        <Typography.Title
          level={4}
          className="text-center text-gray-800 text-3xl mb-8"
        >
          Register to use our service 👋🏻
        </Typography.Title>
        <Form name="register" onFinish={onFinish} className="mt-8 space-y-6">
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              className="site-form-item-icon"
              size="large"
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              className="site-form-item-icon"
              size="large"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              className="site-form-item-icon"
              size="large"
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item name="address">
            <Input
              prefix={<HomeOutlined />}
              className="site-form-item-icon"
              size="large"
              placeholder="Address (Optional)"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="site-form-item-icon"
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              className="site-form-item-icon"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-14 text-lg py-3 bg-blue-500 hover:bg-blue-600"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;

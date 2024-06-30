import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Form, Input, Button, Select, notification, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const RequestForm = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [serviceList, setServiceList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const response = await axios.get('/services');
        setServiceList(response.data);
      } catch (error) {
        console.error('Error fetching service list:', error);
      }
    };

    fetchServiceList();
  }, []);

  const onFinish = async (values) => {
    try {
      const completeData = {
        ...values,
        user_id: userData.user.id,
        service: values.service.join(', '),
        status: "Pending"
      };
      const response = await axios.post('/request-orders', completeData);
      console.log('Request created:', response.data);
      setOrderId(response.data.request_order_id); // Đảm bảo API trả về orderId
    setIsModalVisible(true);
      notification.success({
        message: 'Request Created Successfully',
        description: 'Your request has been submitted successfully.',
      });
    } catch (error) {
      console.error('Error creating request:', error);
      notification.error({
        message: 'Failed to Create Request',
        description: 'There was an error submitting your request.',
      });
    }
  };

  const handleCancel = () => {
    navigate('/user/request-orders'); // Adjust this path as needed
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/user/request-orders'); // Adjust this path as needed
  };

  const [form] = Form.useForm();
  
  return (
    <>
    <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-4">
      <Form.Item
        name="service"
        label="Service"
        rules={[{ required: true, message: 'Please select a service!' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select service(s)"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {serviceList.map(service => (
            <Select.Option key={service.service_id} value={service.service_name}>
              {service.service_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="detail"
        label="Detail"
        rules={[{ required: true, message: 'Please enter the detail!' }]}
      >
        <Input.TextArea rows={4} placeholder="Describe your request here" />
      </Form.Item>

      <Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="mr-2 w-32 bg-blue-500 hover:bg-blue-600 w-24 rounded-lg text-white">
          Submit Request
        </Button>
        <Button type="default" className="mr-2 bg-yellow-500 hover:bg-yellow-600 w-24 rounded-lg text-white" onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
      </Form.Item>
    </Form>
    <Modal
      title="Request Successful"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={() => setIsModalVisible(false)}
      okButtonProps={{ className: "bg-blue-500 hover:bg-blue-600" }}
    >
      <p>Your request has been successfully submitted.</p>
      <p>Your order ID is: {orderId}</p>
    </Modal>
    </>
  );
};

export default RequestForm;

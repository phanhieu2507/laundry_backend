import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Descriptions, Modal, Form, Select, notification, InputNumber, Table } from 'antd';
import axios from '../../../../component/api/axios';
import AdminNavbar from "../../../../component/navbar/admin-nav";
import AdminSidebar from "../../../../component/sidebar/admin-side";

const { Option } = Select;

const PromoCodeDetail = () => {
  const [promoCode, setPromoCode] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPromoCode();
    fetchUsers();
    fetchAssignedUsers();
  }, [id]);

  const fetchPromoCode = async () => {
    try {
      const response = await axios.get(`/promo-codes/${id}`);
      setPromoCode(response.data);
    } catch (error) {
      notification.error({ message: "Error fetching promo code details" });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      notification.error({ message: "Error fetching users" });
    }
  };

  const fetchAssignedUsers = async () => {
    try {
      const response = await axios.get(`/promo-codes/${id}/assigned-users`);
      setAssignedUsers(response.data);
    } catch (error) {
      notification.error({ message: "Error fetching assigned users" });
    }
  };

  const handleAssign = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    try {
      await axios.post(`/promo-codes/${id}/assign`, {
        userIds: selectedUsers,
        quantity: values.quantity
      });
      setIsModalVisible(false);
      notification.success({ message: "Promo code assigned successfully" });
      fetchAssignedUsers();
    } catch (error) {
      notification.error({ message: "Error assigning promo code" });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelectChange = (selectedItems) => {
    setSelectedUsers(selectedItems);
    form.setFieldsValue({ userIds: selectedItems });
  };

  const handleSelectAll = () => {
    const allUserIds = users.map(user => user.id);
    setSelectedUsers(allUserIds);
    form.setFieldsValue({ userIds: allUserIds });
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      // Truy cập vào record.user để lấy tên
      render: (text, record) => record.user.name
    },
    {
      title: 'Phone',
      key: 'phone',
      // Truy cập vào record.user để lấy số điện thoại
      render: (text, record) => record.user.phone
    },
    {
      title: 'Assigned On',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleDateString() // Định dạng ngày tháng
    },
    {
      title: 'Used',
      dataIndex: 'is_used',
      key: 'is_used'
    },
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ml-64 p-4">
          <h2 className="text-2xl font-semibold mb-4">Promo Code Details</h2>
          {promoCode && (
            <Descriptions title="Promo Code Info">
              <Descriptions.Item label="Code">{promoCode.code}</Descriptions.Item>
              <Descriptions.Item label="Description">{promoCode.description}</Descriptions.Item>
              <Descriptions.Item label="Discount Type">{promoCode.discount_type}</Descriptions.Item>
              <Descriptions.Item label="Discount Value">{promoCode.discount_value}</Descriptions.Item>
              <Descriptions.Item label="Valid From">{promoCode.valid_from}</Descriptions.Item>
              <Descriptions.Item label="Valid Until">{promoCode.valid_until}</Descriptions.Item>
              <Descriptions.Item label="Status">{promoCode.status}</Descriptions.Item>
              <Descriptions.Item label="Usage Limit">{promoCode.usage_limit}</Descriptions.Item>
              <Descriptions.Item label="Times Used">{promoCode.times_used}</Descriptions.Item>
            </Descriptions>
          )}
          <Button
            type="primary"
            className="mt-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
            onClick={handleAssign}
          >
            Assign Promo Code
          </Button>
          <Table
            columns={columns}
            dataSource={assignedUsers}
            pagination={{ pageSize: 10 }}
            rowKey="id"
          />
        </div>
      </div>
      <Modal
        title="Assign Promo Code"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="userIds"
            label="Select Users"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select users"
              onChange={onSelectChange}
              value={selectedUsers}
            >
              {users.map(user => (
                <Option key={user.id} value={user.id}>{`${user.name} - ${user.phone}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Button
            onClick={handleSelectAll}
            className="bg-gray-300 hover:bg-gray-400 text-black"
          >
            Select All
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PromoCodeDetail;

import React, { useState, useEffect } from "react";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/admin-nav";
import AdminSidebar from "../../../component/sidebar/admin-side";
import { Table, Button, Popconfirm, Typography, Input } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearch = value => {
    setSearchTerm(value);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <Button icon={<EditOutlined />} onClick={() => console.log("Edit user", record.id)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-24">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => console.log("Delete user", record.id)}  // Replace with actual delete logic
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-24">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar/>
      <div className="max-w-screen-xl mx-auto p-4 pt-12 ml-96">
        <Title level={2} className="text-left text-2xl font-semibold my-6">
          User List
        </Title>
        <Input.Search
          placeholder="Search by name, email, or phone"
          onSearch={handleSearch}
          enterButton
          className="mb-4 bg-blue-500 rounded-lg"
        />
        <Table dataSource={filteredUsers} columns={columns} rowKey="id" />
      </div>
      </div>
    </div>
  );
};

export default AdminUserList;

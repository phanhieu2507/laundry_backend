import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/admin-nav";
import AdminSidebar from "../../../component/sidebar/admin-side";
import { Table, Button, Popconfirm, Typography, Space, Input, notification } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/orders")
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleDelete = (orderId) => {
    axios
      .delete(`/api/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== orderId));
        notification.success({ message: 'Order deleted successfully' });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        notification.error({ message: 'Error deleting order', description: error.message });
      });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    axios
      .get(`/orders/search?query=${value}`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error searching orders:", error));
  };

  const columns = [
    { title: "Order ID", dataIndex: "order_id", key: "order_id" },
    { title: "User", dataIndex: ["user", "name"], key: "user" },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Total Amount", dataIndex: "total_amount", key: "total_amount" },
    { title: "Promo Code", dataIndex: "promo_code", key: "promo_code" },
    { title: "Payment Status", dataIndex: "payment_status", key: "payment_status" },
    { title: "Order Date", dataIndex: "order_date", key: "order_date" },
    { title: "Detail", dataIndex: "detail", key: "detail" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`${record.order_id}/edit`} >
          <Button className="mr-2 bg-blue-500 hover:bg-blue-600 w-24 rounded-lg text-white" icon={<EditOutlined />} primary>
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="mr-2 bg-red-500 hover:bg-red-600 w-24 rounded-lg text-white" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

 // Lọc các đơn hàng dựa trên từ khóa tìm kiếm
const filteredOrders = orders.filter((order) => {
  return (
    order.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    order.service.toLowerCase().includes(searchText.toLowerCase()) ||
    order.total_amount.toString().includes(searchText) ||
    order.payment_status.toLowerCase().includes(searchText.toLowerCase()) ||
    order.promo_code?.toLowerCase().includes(searchText.toLowerCase()) ||
    order.detail.toLowerCase().includes(searchText.toLowerCase())
  );
});

return (
  <div>
    <AdminNavbar />
    <div className="flex">
      <AdminSidebar />
      <div className="container mx-auto p-4 pt-20 flex-grow ml-64">
        <Title level={2} className="text-2xl font-semibold mb-4 text-left">Order List</Title>
        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search orders"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Link to="/admin/orders/create" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 inline-flex items-center">
            <PlusOutlined /> Add New Order
          </Link>
        </div>
        <Table dataSource={filteredOrders} columns={columns} rowKey="id" pagination={{ position: ["bottomRight"] }} rowClassName={(record) => record.payment_status === "unpaid" ? "bg-yellow-100" : ""}/>
      </div>
    </div>
  </div>
);

};

export default AdminOrderList;

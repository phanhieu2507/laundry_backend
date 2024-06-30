import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';
import UserSidebar from '../../../component/sidebar/user-side';

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const response = await axios.get(`/user/${userData.user.id}/orders`);
    setOrders(response.data);
  };

  const handlePay = (order) => {
    const amount = order.total_amount; // Format amount for API
    const description = `ORDnumber-${order.order_id}`;
    const uri = `https://vietqr.co/api/generate/vcb/1029094446/VIETQR.CO/${amount}/${description}`;
   
      setCurrentOrder({
        ...order,
        qrCodeUrl: uri
      });
      setIsModalVisible(true);
   
  };

  const columns = [
    { title: 'Order Number', dataIndex: 'order_id', key: 'order_id' },
    { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount' },
    { title: 'Payment Status', dataIndex: 'payment_status', key: 'payment_status' },
    { title: 'Order Date', dataIndex: 'order_date', key: 'order_date' },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Detail', dataIndex: 'detail', key: 'detail' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.payment_status === 'unpaid' ? (
          <Button className='bg-blue-500 hover:bg-blue-600' onClick={() => handlePay(record)}><span className='text-white'>Pay</span></Button>
        ) : null
      )
    }
  ];

  return (
    <div className="flex">
      <UserNavbar />
      <UserSidebar />
      <div className="flex-grow ml-64 p-4">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-6 pt-8">Your Orders</h2>
          <Table columns={columns} dataSource={orders} rowKey="order_id" />
          {currentOrder && (
            <Modal
              title="Scan to Pay"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <p>Please scan the QR code to complete the payment:</p>
              <img src={currentOrder.qrCodeUrl} alt="QR Code" />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrderList;

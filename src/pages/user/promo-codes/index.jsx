import React, { useState, useEffect } from 'react';
import { Table, notification, Tag } from 'antd';
import axios from '../../../../component/api/axios';
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";
import moment from 'moment'; // Để so sánh ngày

const UserPromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    fetchUserPromoCodes();
  }, []);

  const fetchUserPromoCodes = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const userId = userData.user.id;
      const { data } = await axios.get(`/users/${userId}/promo-codes`);
      setPromoCodes(data);
    } catch (error) {
      notification.error({ message: 'Error fetching promo codes' });
    }
  };

  const getStatusTag = (promoCode) => {
    const now = moment();
    const validUntil = moment(promoCode.valid_until);
    if (promoCode.times_used >= promoCode.limit) {
      return <Tag color="red">Used Up</Tag>;
    } else if (validUntil.isBefore(now)) {
      return <Tag color="volcano">Expired</Tag>;
    } else {
      return <Tag color="green">Active</Tag>;
    }
  };

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Discount Type', dataIndex: 'discount_type', key: 'discount_type' },
    { title: 'Discount Value', dataIndex: 'discount_value', key: 'discount_value' },
    { title: 'Valid From', dataIndex: 'valid_from', key: 'valid_from' },
    { title: 'Valid Until', dataIndex: 'valid_until', key: 'valid_until' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Usage Limit', dataIndex: 'usage_limit', key: 'usage_limit' },
    { title: 'Times Used', dataIndex: 'times_used', key: 'times_used' },
    {
      title: 'Tag',
      key: 'tag',
      render: (_, promoCode) => getStatusTag(promoCode)
    },
  ];

  return (
    <div>
      <UserNavbar />
      <div className="flex">
        <UserSidebar />
        <div className="flex-grow ml-64 p-4">
          <h2 className="text-2xl font-semibold mb-4">Your Promo Codes</h2>
          <Table
            columns={columns}
            dataSource={promoCodes}
            pagination={{ pageSize: 10 }}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
};

export default UserPromoCodes;

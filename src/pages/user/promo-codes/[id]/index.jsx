import React, { useState, useEffect } from 'react';
import axios from '../../../../component/api/axios';
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";
import PromoCodeCard from '../../../../component/promoCodeCard';
import { Typography } from 'antd';

const UserPromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const { Title } = Typography;
  
  useEffect(() => {
    const fetchUserPromoCodes = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const { data } = await axios.get(`/users/${userData.user.id}/promo-codes`);
        setPromoCodes(data);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
      }
    };

    fetchUserPromoCodes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <UserNavbar />
      <UserSidebar />
      <div className="px-10 py-5">
        <Title level={2} className="text-center text-gray-800 mt-16">Your Promo Codes</Title>
        <div className="flex flex-wrap justify-left gap-4 mt-16 ml-64">
          {promoCodes.map(promoCode => (
            <PromoCodeCard key={promoCode.id} promoCode={promoCode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPromoCodes;

import React from 'react';
import RequestForm from '../../../../component/request-orders/request-form';
import UserNavbar from '../../../../component/navbar/user-nav';
import { Card } from 'antd';
import UserSidebar from '../../../../component/sidebar/user-side';

const CreateRequest = () => {
  return (
    <div>
      <UserNavbar />
      <UserSidebar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card
          title="Create a New Request"
          bordered={false}
          className="w-full max-w-xl p-4 rounded-lg shadow-md"
        >
          <RequestForm />
        </Card>
      </div>
    </div>
  );
};

export default CreateRequest;


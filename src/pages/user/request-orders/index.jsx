import React, { useEffect, useState } from 'react';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';
import { Modal, Button, Form, Input, Popconfirm } from "antd";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import UserSidebar from '../../../component/sidebar/user-side';
const UserRequestList = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserRequests();
  }, [statusFilter]); // Thêm statusFilter vào danh sách phụ thuộc
  

  function formatDate(dateString) {
    return dayjs(dateString).format("YYYY-MM-DD HH:mm");
  } 
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-200";
      case "Processing":
        return "text-blue-500 bg-blue-200";
      case "Completed":
        return "text-green-500 bg-green-200";
      default:
        return "text-gray-500 bg-gray-200";
    }
  }; 

  const fetchUserRequests = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const response = await axios.get(`/user/${userData.user.id}/request-orders`);
      const data = response.data;
      // Áp dụng bộ lọc dựa trên statusFilter
      if (statusFilter !== "all") {
        const filteredData = data.filter(request => request.status.toLowerCase() === statusFilter);
        setUserRequests(filteredData);
      } else {
        setUserRequests(data);
      }
    } catch (error) {
      console.error('Error fetching user requests:', error);
    }
  };
  

  return (
    <div>
      <UserNavbar />
      <div className="flex">
      <UserSidebar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 ml-64">
        <div className="flex flex-col mt-20 mx-auto px-4 sm:px-6 lg:px-8">
  <div className="mb-4">
    <h2 className="text-2xl font-semibold text-gray-800">
      Your Requests
    </h2>
  </div>
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <Button
      type="primary"
      onClick={() => navigate(`/user/request-orders/create`)}
      className="text-white bg-blue-500 hover:bg-blue-600 mb-4 md:mb-0"
    >
      Add New Request Order
    </Button>
    <div className="flex flex-wrap items-center justify-center gap-2">
      <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
        Filter by Status:
      </label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mt-1 pl-3 pr-10 py-2 w-full md:w-auto text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </div>
</div>


        <div className="flex flex-col mt-8 boder-2">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request Number
                      </th>
                
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Detail
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted On
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userRequests.map((request) => (
                      <tr
                        key={request.request_order_id}
                        className={`${getStatusColor(
                          request.status
                        )} hover:bg-gray-50`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.request_order_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.detail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    
                         <span   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                              {request.status}
                         </span>
                          

                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default UserRequestList;

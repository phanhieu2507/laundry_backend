import React from 'react';
import { Layout, Menu, Dropdown, notification } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../notibell'; // Đảm bảo đường dẫn đúng
import axios from '../api/axios';

const { Header } = Layout;

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Gửi yêu cầu đăng xuất đến server nếu cần
      await axios.post('/logout');
  
      // Xóa thông tin người dùng và token khỏi sessionStorage
      sessionStorage.removeItem('userData');
  
      // Xóa tất cả dữ liệu khác trong sessionStorage nếu cần
      sessionStorage.clear();
  
      // Hiển thị thông báo
      notification.success({
        message: "Log Out Successfully",
      });
  
      // Chuyển hướng người dùng về trang đăng nhập
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      notification.error({
        message: "Error during logout",
        description: "Logout failed"
      });
    }
  };

  // Lấy tên người dùng từ sessionStorage, nếu không có giá trị mặc định là 'Guest'
  const userName = JSON.parse(sessionStorage.getItem('userData')).user?.name || 'Guest';

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white fixed top-0 left-0 right-0 z-10 shadow-sm">
      <div className="flex items-center justify-end pr-4">
        <NotificationBell />
        <div className="ml-10">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className="cursor-pointer flex items-center">
              <div className="text-gray-900 mr-2">
                <UserOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
              </div>
              <div className="text-gray-900 mr-4" style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{userName}</div>
              <DownOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default UserNavbar;

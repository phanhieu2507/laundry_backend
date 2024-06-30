import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { notification } from 'antd';
import NotificationBell from '../notibell'; // Đảm bảo đường dẫn đúng
import axios from '../api/axios';
const { Header } = Layout;

const AdminNavbar = () => {
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
        message: "Bạn đã Log out",
      });
  
      // Chuyển hướng người dùng về trang đăng nhập
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      notification.error({
        message: "Lỗi khi đăng xuất",
        description: "Không thể đăng xuất. Vui lòng thử lại."
      });
    }
  };

  // Lấy tên người dùng từ local storage
  const userName = JSON.parse(sessionStorage.getItem('userData')).user.name;

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white fixed top-0 left-0 right-0 z-10 shadow-sm">
      <div className="flex items-center justify-between w-full px-4">
        {/* NotificationBell được đặt trong một div với margin phải là 10px */}
        <div className="ml-auto flex items-center">
          <div className="mr-10">
            <NotificationBell />
          </div>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className="cursor-pointer flex items-center">
              <div className="text-gray-900 mr-2">
                <UserOutlined />
              </div>
              <div className="text-gray-900 mr-4">{userName}</div>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AdminNavbar;

import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  FormOutlined, 
  CommentOutlined, 
  MessageOutlined, 
  BarChartOutlined, 
  TagOutlined 
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = () => {
  const navigate = useNavigate();

  const getPathKey = (path) => {
    switch (path) {
      case '/admin/services': return '1';
      case '/admin/request-orders': return '2';
      case '/admin/orders': return '3'; // Bao gồm cả các sub-path của orders
      case '/admin/users': return '4';
      case '/admin/promo-codes': return '5';
      default: return '1';
    }
  };

  return (
    <Sider
      className="bg-white fixed top-0 left-0 bottom-0 z-10 shadow-md"
      width={200}
      theme="light"
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="text-black text-center my-4">
            <h3 className="text-lg font-bold">Admin Panel</h3>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[getPathKey(window.location.pathname)]}
            style={{ borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<BarChartOutlined />} className="hover:bg-gray-200">
              <Link to="/admin/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined />} className="hover:bg-gray-200">
              <Link to="/admin/request-orders">Requests</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FormOutlined />} className="hover:bg-gray-200">
              <Link to="/admin/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />} className="hover:bg-gray-200">
              <Link to="/admin/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<TagOutlined />} className="hover:bg-gray-200">
              <Link to="/admin/promo-codes">Promo Code</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default AdminSidebar;

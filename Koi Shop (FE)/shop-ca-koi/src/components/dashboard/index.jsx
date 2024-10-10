import { useState } from 'react';
import { FileOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('User', '1', <FileOutlined />),
  getItem('User', '1', <FileOutlined />),
];

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate(); // Dùng để điều hướng

  const onMenuClick = (item) => {
    if (item.key === '1') {
      // Khi bấm vào "User", điều hướng sang /dashboard/user
      navigate('/home/dashboard/user');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onClick={onMenuClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        {children}
      </Layout>
    </Layout>
  );
};

export default Dashboard;

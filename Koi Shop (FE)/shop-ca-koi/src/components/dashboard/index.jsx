import { useState } from "react";
import {
  BarChartOutlined,
  FileOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";

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
  getItem("User", "1", <UserOutlined />),
  getItem("Koi", "2", <FileOutlined />, [
    getItem("Breed", "2-1", <FileOutlined />), // Mục con cho Koi
    getItem("Origin", "2-2", <FileOutlined />),
    getItem("Koi", "2-3", <FileOutlined />), // Mục con cho Koi
  ]),
  getItem("Consignment", "3", <ProductOutlined />),
  getItem("Order", "4", <ShoppingCartOutlined />),
  getItem("Batch", "5", <FileOutlined />),
  getItem("Promotion", "6", <FileOutlined />),
  getItem("Statistic", "7", <BarChartOutlined />),
  getItem("Icome", "8", <BarChartOutlined />),
  getItem("Rating&Feedback", "9", <FileOutlined />),
];

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // State để theo dõi mục đã chọn
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate(); // Dùng để điều hướng

  const onMenuClick = (item) => {
    setSelectedKey(item.key); // Cập nhật mục đã chọn
    if (item.key === "1") {
      navigate("/home/dashboard/user");
    }
    if (item.key === "2-1") {
      navigate("/home/dashboard/koi/breed"); // Đường dẫn cho mục Batch
    }
    if (item.key === "2-2") {
      navigate("/home/dashboard/koi/origin"); // Đường dẫn cho mục Origin
    }
    if (item.key === "2-3") {
      navigate("/home/dashboard/koi"); // Đường dẫn cho mục Koi
    }
    if (item.key === "3") {
      navigate("/home/dashboard/consignment");
    }
    if (item.key === "4") {
      navigate("/home/dashboard/order");
    }
    if (item.key === "5") {
      navigate("/home/dashboard/batch");
    }
    if (item.key === "6") {
      navigate("/home/dashboard/promotion");
    }
    if (item.key === "7") {
      navigate("/home/dashboard/stat");
    }
    if (item.key === "8") {
      navigate("/home/dashboard/income");
    }
    if (item.key === "9") {
      navigate("/home/dashboard/rating_feedback");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={onMenuClick}
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]} // Sử dụng selectedKeys để đánh dấu mục hiện tại
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        {children}
        <div>
          <Link to="/home">
            <Button>Trở về</Button>
          </Link>
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

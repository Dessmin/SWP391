import { useState } from "react";
import {
  BarChartOutlined,
  ShoppingCartOutlined,
  
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faComment,
  faDna,
  faFish,
  faGlobe,
  faHandshake,
  faMoneyBillWave,
  faNewspaper,
  faPercent,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
  getItem("User", "1", <FontAwesomeIcon icon={faUsers} />),
  getItem("Koi", "2", <FontAwesomeIcon icon={faFish} />, [
    getItem("Breed", "2-1", <FontAwesomeIcon icon={faDna} />), // Mục con cho Koi
    getItem("Origin", "2-2", <FontAwesomeIcon icon={faGlobe} />),
    getItem("Koi", "2-3", <FontAwesomeIcon icon={faFish} />),
    getItem("Batch", "2-4", <FontAwesomeIcon icon={faBoxesStacked} />), // Mục con cho Koi
  ]),
  getItem("Consignment", "3", <FontAwesomeIcon icon={faHandshake} />),
  getItem("Order", "4", <ShoppingCartOutlined />),
  
  getItem("Promotion", "5", <FontAwesomeIcon icon={faPercent} />),
  getItem("Statistic", "6", <BarChartOutlined />),
  getItem("Icome", "7", <FontAwesomeIcon icon={faMoneyBillWave} />),
  getItem("Rating&Feedback", "8", <FontAwesomeIcon icon={faComment} />),
  getItem("Posting", "9", <FontAwesomeIcon icon={faNewspaper} />),
];

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate(); 

  const onMenuClick = (item) => {
    setSelectedKey(item.key); 
    if (item.key === "1") {
      navigate("/home/dashboard/user");
    }
    if (item.key === "2-1") {
      navigate("/home/dashboard/koi/breed"); 
    }
    if (item.key === "2-2") {
      navigate("/home/dashboard/koi/origin"); 
    }
    if (item.key === "2-3") {
      navigate("/home/dashboard/koi"); 
    }
    if (item.key === "3") {
      navigate("/home/dashboard/consignment");
    }
    if (item.key === "4") {
      navigate("/home/dashboard/order");
    }
    if (item.key === "2-4") {
      navigate("/home/dashboard/batch");
    }
    if (item.key === "5") {
      navigate("/home/dashboard/promotion");
    }
    if (item.key === "6") {
      navigate("/home/dashboard/stat");
    }
    if (item.key === "7") {
      navigate("/home/dashboard/income");
    }
    if (item.key === "8") {
      navigate("/home/dashboard/rating_feedback");
    }
    if (item.key === "9") {
      navigate("/home/dashboard/posting");
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
          selectedKeys={[selectedKey]} 
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

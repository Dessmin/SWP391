import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import "./index.scss";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { setSearchTerm } from "../../redux/features/searchSlice";
import { useState } from "react";

function HeaderLoged() {
  const { Search } = Input;
  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); 

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value)); 
    navigate("/home"); 
  };

  const handleLogout = () => {
    
    dispatch(logout());

    
    localStorage.removeItem("user"); 
    sessionStorage.removeItem("user");
    sessionStorage.removeItem(`cart_${user.id}`);
    
    toast.success("Tạm biệt");

    
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="https://gudlogo.com/wp-content/uploads/2019/05/logo-ca-Koi-37.png"
          alt=""
          width={70}
          height={70}
        />
      </div>
      <div className="header__navigate">
        <ul>
          <Link to="/home">
            <li>Trang chủ</li>
          </Link>
          
          <Link to="/consignment">
            <li>Ký gửi cá Koi</li>
          </Link>
          {user.role !== 'Customer' && (
          <Link to="/home/dashboard/stat">
            <li>Dashboard</li>
          </Link>
        )}
          
            
          
          <li className="search">
            <div className="search-container">
              <Search
                placeholder="Nhập tên cá Koi muốn tìm"
                allowClear
                enterButton="Search"
                onSearch={handleSearch}
                size="large"
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="header__welcome-logout">
        <ul className="logout-box">
          <Link to="/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "25px", color: "white" }}
            />
          </Link>
          <div
            className="user-menu-container"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <UserOutlined
              style={{ fontSize: "25px", cursor: "pointer", color: "white" }}
            />
            {showMenu && (
              <div className="user-menu">
                <ul>
                  <li onClick={() => navigate(`/detailUser/${user.userId}`)}>
                    Thông tin cá nhân
                  </li>
                  <li onClick={() => navigate(`/orderHistory`)}>
                    Lịch sử đơn hàng
                  </li>
                </ul>
              </div>
            )}
          </div>
          <li className="Logout-template" onClick={handleLogout}>
            Log out
          </li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderLoged;

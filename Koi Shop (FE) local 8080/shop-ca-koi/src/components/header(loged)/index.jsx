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
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // Trạng thái hiển thị menu

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value)); // Cập nhật từ khóa tìm kiếm trong Redux
    navigate("/home"); // Điều hướng đến trang home (nơi có KoiList)
  };

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi Redux
    dispatch(logout());

    // Xóa token khỏi localStorage (nếu bạn đang sử dụng token)
    localStorage.removeItem("user"); // Hoặc xóa cookie nếu bạn lưu trữ ở đó
    sessionStorage.removeItem("user");
    sessionStorage.removeItem(`cart_${user.id}`);
    // Hiển thị thông báo
    toast.success("Tạm biệt");

    // Điều hướng về trang đăng nhập
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

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import "./index.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";

function HeaderLoged() {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const u = sessionStorage.getItem('user')

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
          <Link to="/introduce">
            <li>Giới thiệu</li>
          </Link>
          <Link to="/consignment">
            <li>Ký gửi cá Koi</li>
          </Link>
          <Link to="/home/dashboard">
            <li>Dashboard</li>
          </Link>
        </ul>
      </div>
      <div className="header__welcome-logout">
        <ul className="logout-box">
          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>

          <li onClick={() => navigate(`/detailUser/${user.userId}`)}>
            Welcome, {user.username}
          </li>

          <li onClick={handleLogout}>Log out</li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderLoged;

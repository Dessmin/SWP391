import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import "./index.scss"

function HeaderLoged() {

    const user = useSelector((state) => state.user);// Lấy thông tin người dùng từ Redux store

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi Redux
        dispatch(logout());
        
        // Xóa token khỏi localStorage (nếu bạn đang sử dụng token)
        localStorage.removeItem('user'); // Hoặc xóa cookie nếu bạn lưu trữ ở đó
        sessionStorage.removeItem('user');
        sessionStorage.removeItem(`cart_${user.id}`);
        // Hiển thị thông báo
        toast.success("Tạm biệt");
    
        // Điều hướng về trang đăng nhập
        navigate("/");
      };

    return (
        <header className="header">
            <div className="header__logo">
                <img src="https://gudlogo.com/wp-content/uploads/2019/05/logo-ca-Koi-37.png"
                    alt="" width={100} />
            </div>
            <div className="header__navigate">
                <ul>
                    <Link to="/"><li>Trang chủ</li></Link>
                    <Link to=""><li>Giới thiệu</li></Link>
                    <Link to=""><li>Cá Koi</li></Link>
                </ul>
            </div>
            <div className="header__welcome-logout">
                <ul className="logout-box">
                    <li>Welcome, {user.username}</li>
                    <li onClick={handleLogout}>Log out</li>
                </ul>
            </div>
        </header>
    )
}

export default HeaderLoged
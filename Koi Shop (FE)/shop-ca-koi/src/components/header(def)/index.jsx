import { Button } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";

function Header() {
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
          <Link to="/">
            <li>Trang chủ</li>
          </Link>
          <Link to="/koi_introduction">
            <li>Cá Koi</li>
          </Link>
          
        </ul>
      </div>
      <div className="header__log-sign">
        <Link to="/login">
          <Button type="primary">Đăng nhập</Button>
        </Link>
        <Link to="/register">
          <Button>Đăng ký</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;

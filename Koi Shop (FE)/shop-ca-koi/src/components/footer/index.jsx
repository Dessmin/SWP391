import "./index.scss";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-section contact">
        <div>
          <h2>Contact us</h2>
        </div>
        <img
          src="https://gudlogo.com/wp-content/uploads/2019/05/logo-ca-Koi-37.png"
          alt="Koi Shop"
          className="logo"
        />
        <p>
          <strong>Địa chỉ: </strong> Quận 9, TP Hồ Chí Minh
        </p>
        <p>
          <strong>SĐT: </strong> 0123456789
        </p>
        <p>
          <strong>Email: </strong> koishop@gmail.com
        </p>
      </div>

      <div className="footer-section links">
        <nav>
          <a href="/">Home</a>
          <a href="/fish">Fish</a>
          <a href="/blogs">Blogs</a>
          <a href="/about">About us</a>
        </nav>
      </div>

      <div className="footer-section quality">
        <h4>Chất lượng đảm bảo</h4>
        <p>
          Tại cửa hàng The Koi Shop, tất cả cá Koi đều được nhập khẩu từ những
          người nuôi cá đáng tin cậy và trải qua các kiểm tra sức khỏe nghiêm
          ngặt. Mỗi con cá đều có giấy chứng nhận về nguồn gốc và sức khỏe, đảm
          bảo sự tin tưởng trong mỗi giao dịch mua hàng.
        </p>
      </div>

      <div className="footer-section copyright">
        <p>@Koi shop Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";
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
        <p>Address: District 9, Ho Chi Minh City</p>
        <p>Phone number: 0123456789</p>
        <p>Email: koishop@gmail.com</p>
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
        <h4>Guaranteed Quality</h4>
        <p>
          At Koi shop, all Koi are sourced from trusted breeders and pass strict
          health checks. Each fish comes with certification of its origin and
          health, ensuring confidence in every purchase.
        </p>
      </div>

      <div className="footer-section copyright">
        <p>@Koi shop Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
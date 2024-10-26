import KoiList from "../../components/koi-list";
import HeaderLoged from "../../components/header(loged)";
import { CartProvider } from "../../helper/CartContext";
import { Link } from "react-router-dom";
import BatchList from "../../components/batch-list";
import "./index.scss";
import Footer from "../../components/footer";

function HomeLoged() {
  return (
    <div className="body">
      <HeaderLoged />
      <div className="body__banner">
        {/* <div className="body__slogan">
          <span className="slogan1">Cá Koi</span>
          <hr />
          <span className="slogan2">Biểu Tượng</span>
          <span className="slogan2">Của</span>
          <span className="slogan2">May Mắn</span>
          <span className="slogan2">Và</span>
          <span className="slogan2">Thịnh Vượng</span>
        </div> */}
      </div>

      <div className="body__list">
        <CartProvider>
          <KoiList />
          <hr />
          <BatchList />
        </CartProvider>
      </div>

      <Footer />
    </div>
  );
}

export default HomeLoged;

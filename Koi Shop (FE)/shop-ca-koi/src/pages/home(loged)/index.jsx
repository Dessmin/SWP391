import KoiList from "../../components/koi-list";
import HeaderLoged from "../../components/header(loged)";
import { CartProvider } from "../../helper/CartContext";

import BatchList from "../../components/batch-list";
import "./index.scss";
import Footer from "../../components/footer";

function HomeLoged() {
  return (
    <div className="body">
      <HeaderLoged />
      <div className="body__banner">
        <div className="body__slogan">
          <span className="slogan1">Cá koi</span>
          <hr />
          <span className="slogan2">Biểu tượng</span>
          <span className="slogan2">của</span>
          <span className="slogan2">may mắn</span>
          <span className="slogan2">và</span>
          <span className="slogan2">thịnh vượng</span>
        </div>
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

import { Button } from "antd";
import PropTypes from "prop-types";
import "./index.scss";
import { useContext } from "react";
import { CartContext } from "../../helper/CartContext";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function CardKoi({ koi }) {
  const handleAddToCart = () => {
    const product = {
      
      id,
      name: fishName,
      image,
      quantity: 1,
      price,
      type: "koi", // Đánh dấu đây là sản phẩm batch, vì bạn có 2 loại sản phẩm: batch và koiFish
    };
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
  };

  const { addToCart } = useContext(CartContext);
  const { id, fishName, breed, origin, size, price, image } = koi;

  return (
    <div className="koi-card">
      <img height={350} src={image} alt="" />

      <div className="koi-card__content">
        <div className="koi-card__info1">
          <span>Name: {fishName}</span>
          <span>Price: {price}.000</span>
        </div>
        <div className="koi-card__info2">
          <span>Origin: {origin}</span>
          <span>Breed: {breed}</span>
        </div>
        <div>Size: {size} cm</div>
      </div>
      <Button
        onClick={handleAddToCart} // Gọi hàm thêm sản phẩm vào giỏ hàng
        style={{ width: "100%", height: "50px" }}
        type="primary"
      >
        Thêm
      </Button>
    </div>
  );
}
CardKoi.propTypes = {
  koi: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fishName: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardKoi;

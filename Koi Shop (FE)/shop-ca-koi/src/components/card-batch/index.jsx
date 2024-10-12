import { Button } from "antd";
import PropTypes from "prop-types";
import "./index.scss";
import { useContext } from "react";
import { CartContext } from "../../helper/CartContext";
function CardBatch({ batch }) {
  const { id, breedName, description, image, quantity, price } = batch;
  const { addToCart } = useContext(CartContext); // Lấy hàm addToCart từ CartContext

  const handleAddToCart = () => {
    const product = {
      id,
      name: breedName,
      image,
      quantity,
      price,
      type: "batch", // Đánh dấu đây là sản phẩm batch, vì bạn có 2 loại sản phẩm: batch và koiFish
    };
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
  };

  return (
    <div className="batch-card">
      <img height={350} src={image} alt={breedName} />

      <div className="batch-card__content">
        <div className="batch-card__info1">
          <span>Name: {breedName}</span>
          <span>Price: {price}.000</span>
        </div>
        <div className="batch-card__info2">
          <span>Quantity: {quantity}</span>
        </div>
        <div>Description: {description}</div>
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

CardBatch.propTypes = {
  batch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    breedName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardBatch;

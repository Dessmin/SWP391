import { Button } from "antd";
import PropTypes from "prop-types";
import './cardKoi.scss'
import { useContext } from "react";
import { CartContext } from "../../helper/CartContext";
import { useNavigate } from "react-router-dom";

function CardKoi({ koi }) {
  const navigate = useNavigate();

  

  const handleAddToCart = () => {
    const product = {
      
      id,
      name: fishName,
      image,
      quantity: 1,
      price,
      type: "KoiFish", 
    };
    addToCart(product); 
  };
  const { id, fishName, breed, origin, size, price, image } = koi;

  const { addToCart } = useContext(CartContext);
  

  return (
    <div className="koi-card1">
      <img height={250} src={image} alt="" />

      <div className="koi-card__content">
        <div className="koi-card__info1">
          <span><strong>Name:</strong> {fishName}</span>
          <span><strong>Price:</strong> {price.toLocaleString()}VND</span>
        </div>
        <div className="koi-card__info2">
          <span><strong>Origin:</strong> {origin}</span>
          <span><strong>Breed:</strong> {breed}</span>
        </div>
        <div><strong>Size:</strong> {size} cm</div>
      </div>
      <Button onClick={() => navigate("/detailKoi/"+id)}>Chi tiết</Button>
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

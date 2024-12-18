import { Button } from "antd";
import PropTypes from "prop-types";
import "./index.scss";
import { useContext } from "react";
import { CartContext } from "../../helper/CartContext";
function CardBatch({ batch }) {
  
  const { addToCart } = useContext(CartContext); 

  const handleAddToCart = () => {
    const product = {
      id,
      name: breedName,
      image,
      quantity,
      price,
      type: "Batch", 
    };
    addToCart(product); 
  };
  const { id, breedName, description, image, quantity, price } = batch;

  return (
    <div className="batch-card">
      <img height={250} src={image} alt={breedName} />

      <div className="batch-card__content">
        <div className="batch-card__info1">
        
          <span><strong>Breed: </strong> {breedName}</span>
          <span><strong>Price: </strong> {price.toLocaleString()}VND</span>
        </div>
        <div className="batch-card__info2">
          <span><strong>Quantity: </strong> {quantity}</span>
        </div>
        <div><strong>Description: </strong> {description}</div>
      </div>

      <Button
        onClick={handleAddToCart} 
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

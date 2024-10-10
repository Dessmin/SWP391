import { Button } from "antd";
import PropTypes from 'prop-types';
import "./index.scss"



function Card({ koi }) {
    const { fishName, breed, origin, size, price, image } = koi;

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
            <Button style={{ width: "100%", height: '50px' }} type="primary">Thêm</Button>
        </div>
    );
}
Card.propTypes = {
    koi: PropTypes.shape({
        fishName: PropTypes.string.isRequired,
        breed: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;

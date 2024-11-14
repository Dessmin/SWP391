import { useEffect, useState } from "react";
import { getCartFromSession, saveCartToSession } from "../../helper/helper";
import { useSelector } from "react-redux";
import { Table, Button, Input, InputNumber, Descriptions, Select } from "antd";
import apiOrder from "../../config/api-order";
import axios from "axios";
import "./index.scss";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tempAmount, setTempAmount] = useState(0);
  const [points, setPoints] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [userPoint, setUserPoint] = useState();
  const [cancel, setCancel] = useState(false);
  const [cashPoint, setCashPoint] = useState(0);
  const [cashVoucher, setCashVoucher] = useState(0);
  const [promotion, setPromotion] = useState([]);

  const cancelApply = () => {
    setCancel(true);
    setVoucherCode("");
    setDiscountPercent(0);
  };

  useEffect(() => {
    if (user) {
      const cartFromSession = getCartFromSession(user.userId).map((item) => ({
        ...item,
        initialQuantity: item.quantity,
      }));
      setCartItems(cartFromSession || []);
    }
  }, [user]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const calculateTotalAmount = () => {
    const subtotal = calculateSubtotal();
    setTempAmount(subtotal);
    const discountFromVoucher = (subtotal * discountPercent) / 100;
    setCashVoucher(discountFromVoucher);
    const discountFromPoints = points;
    setCashPoint(subtotal - discountFromPoints);
    const total = subtotal - discountFromVoucher - discountFromPoints;
    setTotalAmount(total > 0 ? total : 0); // Đảm bảo tổng không âm
  };

  const handleVoucherApply = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/promotions/${voucherCode}/discount`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);

      setCancel(false);
      setDiscountPercent(response.data);
      calculateTotalAmount();
    } catch (error) {
      console.error("Error applying voucher", error);
      alert("Invalid voucher code.");
    }
  };

  const fetchPromotion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/promotions/list-promotions",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPromotion(response.data); // Lưu toàn bộ dữ liệu vào state promotion
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPromotion(), calculateTotalAmount();
  }, [cartItems, points, discountPercent]);

  const fetchPoint = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/customer-point`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserPoint(response.data);
      console.log("User points updated successfully");
    } catch (error) {
      console.error("Error updating user points", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchPoint();
    }
  }, [user]);

  const handleQuantityChange = (value, productId, productType) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.type === productType) {
        return {
          ...item,
          quantity: value > item.initialQuantity ? item.initialQuantity : value,
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartToSession(user.userId, updatedCart);
  };

  const handleRemoveFromCart = (productId, productType) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === productId && item.type === productType)
    );

    setCartItems(updatedCart);
    saveCartToSession(user.userId, updatedCart);

    window.location.reload();
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderRequest = {
      totalAmount: totalAmount,
      type: "Normal",
      orderDetails: cartItems.map((item) => ({
        productId: item.id,
        productType: item.type,
        quantity: item.type === "Batch" ? item.quantity : 1,
        unitPrice: item.price,
      })),
    };

    try {
      const response = await apiOrder.post("add-order", orderRequest, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const paymentUrl = response.data;

      window.location.href = paymentUrl;
      if (points > 0) {
        sessionStorage.setItem("point", points);
      }

      setCartItems([]);
      saveCartToSession(user.userId, []);
    } catch (error) {
      console.error("There was an error processing the order!", error);
      alert("Error creating order. Please try again.");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" width={100} height={100} />
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) =>
        record.type === "Batch" ? (
          <InputNumber
            min={1}
            max={record.initialQuantity}
            value={quantity}
            onChange={(value) =>
              handleQuantityChange(value, record.id, record.type)
            }
          />
        ) : (
          1
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          danger
          onClick={() => handleRemoveFromCart(record.id, record.type)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="cart-container">
      <div>
        <h1 className="cart-title">Your cart</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">No items in cart</p>
        ) : (
          <div>
            <Table
              className="cart-table"
              columns={columns}
              dataSource={cartItems}
              rowKey="id"
            />

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Descriptions style={{ width: "50%" }} bordered column={1}>
                <Descriptions.Item label="Tạm tính">
                  <strong>{tempAmount.toLocaleString()} VND</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Dùng điểm tích lũy">
                  <Input
                    type="number"
                    placeholder="Enter points to use"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="points-input"
                  />
                  Bạn có <strong>{userPoint}</strong> điểm tích lũy
                </Descriptions.Item>
                <Descriptions.Item label="Voucher">
                  {/* <Input
                    placeholder="Enter voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="voucher-input"
                  /> */}
                  <Select
                    placeholder="Select voucher code"
                    value={voucherCode}
                    onChange={(value) => setVoucherCode(value)}
                    className="voucher-select"
                    style={{ width: "100%" }}
                  >
                    {promotion.map((promo) => (
                      <Select.Option
                        key={promo.promotionID}
                        value={promo.promotionName}
                      >
                        {promo.promotionName}
                      </Select.Option>
                    ))}
                  </Select>
                  <div className="twoBttn">
                    <Button
                      type="primary"
                      onClick={handleVoucherApply}
                      className="apply-voucher-btn"
                    >
                      Apply Voucher
                    </Button>
                    <Button
                      type="primary"
                      onClick={cancelApply}
                      className="apply-voucher-btn"
                    >
                      Hủy voucher
                    </Button>
                    Giảm {cashVoucher.toLocaleString()} VND
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền">
                  <strong>
                    {cancel
                      ? cashPoint.toLocaleString()
                      : totalAmount.toLocaleString()}{" "}
                    VND
                  </strong>
                </Descriptions.Item>
              </Descriptions>
            </div>

            {/* <div className="points-amount-section">
              <div className="points-section">
                <span>
                  Bạn có <strong>{userPoint}</strong> điểm
                </span>
                <Input
                  type="number"
                  placeholder="Enter points to use"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  
                  className="points-input"
                />
                <span className="points-label">Points</span>
              </div>

              <h3 className="total-amount">
                Tạm tính: {tempAmount.toLocaleString()} VND
              </h3>

              <h3 className="total-amount">
                Tổng tiền: {cancel ? cashPoint.toLocaleString() : totalAmount.toLocaleString()} VND
              </h3>
            </div> */}

            <div className="voucher-checkout-section">
              {/* <div className="voucher-section">
                <Input
                  placeholder="Enter voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="voucher-input"
                />
                <Button
                  type="primary"
                  onClick={handleVoucherApply}
                  className="apply-voucher-btn"
                >
                  Apply Voucher
                </Button>
                <Button
                  type="primary"
                  onClick={cancelApply}
                  className="apply-voucher-btn"
                >
                  Hủy voucher
                </Button>
              </div> */}

              <div className="amount-checkout-section">
                <Button
                  type="primary"
                  onClick={handleCheckout}
                  className="checkout-btn"
                  disabled={points > userPoint || cartItems.length === 0}
                >
                  Checkout
                </Button>
                {points > userPoint && (
                  <p className="insufficient-points-message">Không đủ điểm</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Link to="/home">
          <Button>
            <RollbackOutlined />
            Trở về
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import { getCartFromSession, saveCartToSession } from "../../helper/helper";
import { useSelector } from "react-redux";
import { Table, Button, Input, InputNumber } from "antd";
import apiOrder from "../../config/api-order";
import axios from "axios";
import "./index.scss";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";


const Cart = () => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const [cartItems, setCartItems] = useState([]); // State để lưu giỏ hàng từ session
  const [totalAmount, setTotalAmount] = useState(0);
  const [points, setPoints] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [userPoint, setUserPoint] = useState();


  // Lấy giỏ hàng từ session theo user id
  useEffect(() => {
    if (user) {
      const cartFromSession = getCartFromSession(user.id).map((item) => ({
        ...item,
        initialQuantity: item.quantity, // Lưu giá trị ban đầu của số lượng
      }));
      setCartItems(cartFromSession || []); // Nếu session không có giỏ hàng, gán giá trị mảng rỗng
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
    const discountFromVoucher = (subtotal * discountPercent) / 100;
    const discountFromPoints = points; // Giả sử mỗi điểm trừ trực tiếp 1 đơn vị tiền
    const total = subtotal - discountFromVoucher - discountFromPoints;
    setTotalAmount(total > 0 ? total : 0); // Đảm bảo tổng không âm
  };


  const handleVoucherApply = async () => {
    try {
      // Gọi API với phương thức GET và truyền mã voucher vào URL
      const response = await axios.get(
        `http://localhost:8080/api/promotions/${voucherCode}/discount`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log();


      // Giả sử API trả về giá trị discountPercent
      setDiscountPercent(response.data); // Lưu phần trăm giảm giá vào state
      calculateTotalAmount(); // Tính toán lại tổng tiền sau khi nhận phần trăm giảm giá
    } catch (error) {
      console.error("Error applying voucher", error);
      alert("Invalid voucher code.");
    }
  };


  useEffect(() => {
    calculateTotalAmount();
  }, [cartItems, points, discountPercent]);


  // const updateUserPoints = async (points) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:8080/api/user/usePoint`,
  //       {
  //         point: points,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     console.log("User points updated successfully");
  //   } catch (error) {
  //     console.error("Error updating user points", error);
  //   }
  // };


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
          quantity: value > item.initialQuantity ? item.initialQuantity : value, // Không cho phép vượt quá số lượng ban đầu
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCartToSession(user.id, updatedCart); // Cập nhật giỏ hàng trong session
  };


  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (productId, productType) => {
    // Xóa sản phẩm dựa trên cả id và type
    const updatedCart = cartItems.filter(
      (item) => !(item.id === productId && item.type === productType)
    );


    setCartItems(updatedCart);
    saveCartToSession(user.id, updatedCart); // Cập nhật giỏ hàng theo userId


    // Tải lại trang sau khi cập nhật giỏ hàng
    window.location.reload();
  };


  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }


    // Tạo đối tượng orderRequest chứa danh sách orderDetails từ cartItems
    const orderRequest = {
      totalAmount: totalAmount,
      type: "Normal",
      orderDetails: cartItems.map((item) => ({
        productId: item.id,
        productType: item.type, // "KoiFish" hoặc "Batch"
        quantity: item.type === "Batch" ? item.quantity : 1, // Batch có số lượng, KoiFish mặc định là 1
        unitPrice: item.price,
      })),
    };


    try {
      // Gọi API tạo đơn hàng và lấy URL thanh toán
      const response = await apiOrder.post("add-order", orderRequest, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Gửi token trong header
        },
      });


      const paymentUrl = response.data; // Giả sử backend trả về paymentUrl


      // Chuyển hướng sang trang thanh toán
      window.location.href = paymentUrl;
      if (points > 0) {
        sessionStorage.setItem("point", points);
      }


      // Xóa giỏ hàng sau khi thanh toán thành công
      setCartItems([]);
      saveCartToSession(user.id, []);
    } catch (error) {
      console.error("There was an error processing the order!", error);
      alert("Error creating order. Please try again.");
    }
  };


  // Định nghĩa các cột cho bảng
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


            <div className="points-amount-section">
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
                Total Amount: {totalAmount.toLocaleString()} VND
              </h3>
            </div>


            <div className="voucher-checkout-section">
              <div className="voucher-section">
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
              </div>


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

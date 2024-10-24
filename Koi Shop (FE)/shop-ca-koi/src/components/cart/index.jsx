import { useEffect, useState } from "react";
import { getCartFromSession, saveCartToSession } from "../../helper/helper";
import { useSelector } from "react-redux";
import { Table, Button, Input, InputNumber } from "antd";
import apiOrder from "../../config/api-order";
import axios from "axios";

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

  const updateUserPoints = async (points) => {
    try {
      await axios.put(
        `http://localhost:8080/api/user/usePoint`,
        {
          point: points,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("User points updated successfully");
    } catch (error) {
      console.error("Error updating user points", error);
    }
  };

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
        await updateUserPoints(points);
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
        <img src={image} alt="Product" width={50} height={50} />
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
    <div>
      <h1 style={{ textAlign: "center" }}>Your cart</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in cart</p>
      ) : (
        <div>
          <Table columns={columns} dataSource={cartItems} rowKey="id" />

          <span style={{ marginLeft: "20px" }}>
            Bạn có <strong>{userPoint}</strong> điểm
          </span>
          <div style={{ marginTop: "20px" }}>
            <Input
              type="number"
              placeholder="Enter points to use"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              style={{ width: "200px", marginRight: "10px" }}
            />
            <span>Points</span>
          </div>

          {/* Nhập voucher */}
          <div style={{ marginTop: "20px" }}>
            <Input
              placeholder="Enter voucher code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              style={{ width: "200px", marginRight: "10px" }}
            />
            <Button type="primary" onClick={handleVoucherApply}>
              Apply Voucher
            </Button>
          </div>

          {/* Hiển thị tổng tiền */}
          <div style={{ marginTop: "20px" }}>
            <h3>Total Amount: {totalAmount.toLocaleString()} VND</h3>
          </div>

          {/* Nút Checkout */}
          <Button
            type="primary"
            onClick={handleCheckout}
            style={{ marginTop: "20px" }}
            disabled={points > userPoint || cartItems.length === 0} // Điều kiện disabled
          >
            Checkout
          </Button>
          {points > userPoint && (
            <p style={{ color: "red", marginTop: "10px" }}>Không đủ điểm</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;

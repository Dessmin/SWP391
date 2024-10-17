import {  useEffect, useState } from "react";
import { getCartFromSession, saveCartToSession } from "../../helper/helper";
import { useSelector } from "react-redux";
import { Table, Button } from "antd";
import apiOrder from "../../config/api-order";

const Cart = () => {
  
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const [cartItems, setCartItems] = useState([]); // State để lưu giỏ hàng từ session

  // Lấy giỏ hàng từ session theo user id
  useEffect(() => {
    if (user) {
      const cartFromSession = getCartFromSession(user.id);
      setCartItems(cartFromSession || []); // Nếu session không có giỏ hàng, gán giá trị mảng rỗng
    }
  }, [user]);

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
      orderDetails: cartItems.map((item) => ({
        productId: item.id,
        productType: item.type, // "KoiFish" hoặc "Batch"
        quantity: item.type === "Batch" ? item.quantity : 1, // Batch có số lượng, KoiFish mặc định là 1
        price: item.price,
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
      render: (quantity, record) => (record.type === "Batch" ? quantity : 1), // Chỉ hiện số lượng cho batch
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
      
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <Table columns={columns} dataSource={cartItems} rowKey="id" />
          {/* Nút Checkout */}
          <Button
            type="primary"
            onClick={handleCheckout}
            style={{ marginTop: "20px" }}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;

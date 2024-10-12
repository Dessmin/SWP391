import { useContext, useEffect, useState } from "react";
import { getCartFromSession, saveCartToSession } from "../../helper/helper";
import { useSelector } from "react-redux";
import { Table, Button } from "antd";
import { CartContext } from "../../helper/CartContext";

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
      render: (quantity, record) => (record.type === "batch" ? quantity : 1), // Chỉ hiện số lượng cho batch
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
        <Table columns={columns} dataSource={cartItems} rowKey="id" />
      )}
    </div>
  );
};

export default Cart;

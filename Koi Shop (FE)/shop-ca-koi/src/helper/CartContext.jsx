import { createContext, useState, useEffect } from "react";
import { getCartFromSession, saveCartToSession } from "./helper";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = useSelector((state) => state.user); // Lấy user từ Redux
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      const sessionCart = getCartFromSession(user.id); // Lấy giỏ hàng theo userId
      setCartItems(sessionCart);
    }
  }, [user]);

  const addToCart = (product) => {
    // Lấy giỏ hàng từ session dựa trên user id, nếu chưa có thì sử dụng giá trị hiện tại của cartItems
    const currentCart = getCartFromSession(user.id) || cartItems;
    toast.success("Thêm thành công")
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng dựa trên type và id
    const isItemInCart = currentCart.some(item =>  item.id === product.id && item.type === product.type);
    
  
    if (isItemInCart) {
      
      
      console.log(`Product with ID ${product.id} and type ${product.type} is already in the cart.`);
      return; // Nếu đã tồn tại, không thêm sản phẩm vào giỏ hàng
    }
  
    // Nếu không trùng lặp, thêm vào giỏ hàng
    const updatedCart = [...currentCart, product];
    setCartItems(updatedCart);
    saveCartToSession(user.id, updatedCart); // Lưu giỏ hàng theo userId vào session
  };
  
  
  const removeFromCart = (productId, productType) => {
    // Xóa sản phẩm dựa trên cả id và type
    const updatedCart = cartItems.filter(
      (item) => !(item.id === productId && item.type === productType)
    );
    
    setCartItems(updatedCart);
    saveCartToSession(user.id, updatedCart); // Cập nhật giỏ hàng theo userId
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

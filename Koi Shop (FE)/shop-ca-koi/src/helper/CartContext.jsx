import { createContext, useState, useEffect } from "react";
import { getCartFromSession, saveCartToSession } from "./helper";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = useSelector((state) => state.user); 
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user && user.userId) {
      const sessionCart = getCartFromSession(user.userId); 
      setCartItems(sessionCart);
    }
  }, [user]);

  const addToCart = (product) => {
    
    const currentCart = getCartFromSession(user.userId) || cartItems;
    toast.success("Thêm thành công")
    
    const isItemInCart = currentCart.some(item =>  item.id === product.id && item.type === product.type);
    
  
    if (isItemInCart) {
      
      
      console.log(`Product with ID ${product.id} and type ${product.type} is already in the cart.`);
      return; 
    }
  
    
    const updatedCart = [...currentCart, product];
    setCartItems(updatedCart);
    saveCartToSession(user.userId, updatedCart); 
  };
  
  
  const removeFromCart = (productId, productType) => {
    
    const updatedCart = cartItems.filter(
      (item) => !(item.id === productId && item.type === productType)
    );
    
    setCartItems(updatedCart);
    saveCartToSession(user.id, updatedCart); 
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

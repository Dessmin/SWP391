import apiKoi from "../config/koi-api";


export const saveCartToSession = (userId, cartItems) => {
    sessionStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  };

  export const getCartFromSession = (userId) => {
    const cart = sessionStorage.getItem(`cart_${userId}`);
    return cart ? JSON.parse(cart) : [];
  };

export const fetchKoiFishById = async ( koiFishId, user) => {
    
    try {
        
        const response = await apiKoi.get(`koiFish/${koiFishId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`, 
            },
        }); 
        return response.data;
    } catch (error) {
        console.error('Failed to fetch KoiFish:', error);
        return null;
    }
};
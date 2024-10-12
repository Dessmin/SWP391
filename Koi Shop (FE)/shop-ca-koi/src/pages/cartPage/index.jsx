import { CartProvider } from '../../helper/CartContext'
import Cart from '../../components/cart'

function CartPage() {
  return (
    <div>
        <CartProvider>
            <h1>Koi Shop</h1>
            
            <Cart />
        </CartProvider>
    </div>
  )
}

export default CartPage
import { CartProvider } from '../../helper/CartContext'
import Cart from '../../components/cart'

function CartPage() {
  return (
    <div>
        <CartProvider>
            <Cart />
        </CartProvider>
    </div>
  )
}

export default CartPage
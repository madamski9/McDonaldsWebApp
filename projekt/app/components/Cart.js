import { useCart } from "../context/CartProvider";
const Cart = () => {
    const { cart } = useCart()

    return (
        <div className="cart-products">
            
        </div>
    )
}

export default Cart;
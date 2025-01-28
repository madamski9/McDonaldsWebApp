"use client"
import { useCart } from "../context/CartProvider"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Cart = ({ setCartVisible }) => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
    const [ totalPrice, setTotalPrice ] = useState(0)
    const router = useRouter()

    const handleCheckout = () => {
        router.push(`/checkout`)
    }

    const cartProducts = Object.keys(cart).map(key => {
        const product = cart[key]
        return (
            <div key={product.uniqueId} className="cart-product">
                <img src={product.image} alt={product.name} />
                <div>{product.name}</div>
                <div>{product.price}</div>
                <button
                    className="delete-cart"
                    onClick={() => removeFromCart(product)}
                >
                    <img className="trash" src="/images/trash.png" />
                </button>
                <button
                    className="decrease-quantity-button"
                    onClick={() => decreaseQuantity(product)}
                >-</button>
                <div>{product.quantity}</div>
                <button
                    className="increase-quantity-button"
                    onClick={() => increaseQuantity(product)}
                >+</button>
            </div>
        )
    })

    useEffect(() => {
        const price = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0)
        setTotalPrice(price)
    }, [cart])

    return (
        <div className="overlay" onClick={() => setCartVisible(false)}>
            <div className="cart-products" onClick={(e) => e.stopPropagation()}>
                {cart.length === 0 ? (
                    <div style={{color: "black"}}>
                        Your cart is empty
                    </div>
                ) : (
                    <div>
                        {cartProducts}
                        <div className="cart-summary">
                            <div className="total-price">
                                Total: {totalPrice.toFixed(2)} €
                            </div>
                            <button 
                                className="checkout-button"
                                onClick={() => {
                                    handleCheckout()
                                    setCartVisible(false)
                                }}
                            >
                                checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;
"use client"
import { useCart } from "../context/CartProvider"
import { useEffect, useState } from "react"

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
    const [ totalPrice, setTotalPrice ] = useState(0)

    const handleCheckout = (cartProducts) => {
        
    }

    const cartProducts = Object.keys(cart).map(key => {
        const product = cart[key]
        return (
            <div key={product.id} className="cart-product">
                <img src={product.image} alt={product.name} />
                <div>{product.name}</div>
                <div>{product.price}</div>
                <button
                    className="delete-cart-product-button"
                    onClick={() => removeFromCart(product.id)}
                >
                    smietnik
                </button>
                <button
                    className="increase-quantity-button"
                    onClick={() => increaseQuantity(product.id)}
                >+</button>
                <div>{product.quantity}</div>
                <button
                    className="decrease-quantity-button"
                    onClick={() => decreaseQuantity(product.id)}
                >-</button>
            </div>
        )
    })

    useEffect(() => {
        const price = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0)
        setTotalPrice(price)
    }, [cart])

    return (
        <div className="cart-products">
            {cart.length === 0 ? (
                <div style={{color: "black"}}>
                    Your cart is empty
                </div>
            ) : (
                <div>
                    {cartProducts}
                    <div>
                        <div>
                            Total: {totalPrice.toFixed(2)} €
                        </div>
                        <button 
                            className="checkout"
                            onClick={() => handleCheckout(cartProducts)}
                        >
                            checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;
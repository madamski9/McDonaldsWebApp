"use client"
import { useCart } from "../context/CartProvider"
import { useState, useEffect } from "react"

const Checkout = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ expandedProductId, setExpandedProductId ] = useState(null)

    useEffect(() => {
        const price = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.replace(" €", "")), 0).toFixed(2)
        setTotalPrice(price)
    }, [cart])

    const toggleExpand = (productId) => {
        setExpandedProductId(expandedProductId === productId ? null : productId)
    }

    return (
        <div className="main-checkout">
            <div className="grid-container-checkout">
                <div className="order-summary">
                    <h2>Order summary</h2>
                    {Object.keys(cart).map(key => {
                        const product = cart[key]
                        const isExpanded = expandedProductId === product.uniqueId
                        return (
                            <div 
                                key={product.uniqueId}
                                className={`grid-item-checkout ${isExpanded ? 'expanded' : ''}`}
                            >
                                <img src={product.image} alt={product.name} />
                                <div>{product.name}</div>
                                <div>{product.price}</div>
                                <button 
                                    className="expand-button"
                                    onClick={() => toggleExpand(product.uniqueId)}>
                                    {isExpanded ? 'Hide Ingredients' : 'Show Ingredients'}
                                </button>
                                {isExpanded && (
                                    <div className="ingredients">
                                        <h3>Ingredients:</h3>
                                        {Object.keys(product.ingredients).map(ingredientKey => (
                                            <div key={ingredientKey}>
                                                <span>{ingredientKey}: </span>
                                                <span>{product.ingredients[ingredientKey].quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="quantity-controls">
                                    <button
                                        className="decrease-quantity-button checkout"
                                        onClick={() => decreaseQuantity(product)}
                                    >-</button>
                                    <span>{product.quantity}</span>
                                    <button
                                        className="increase-quantity-button checkout"
                                        onClick={() => increaseQuantity(product)}
                                    >+</button>
                                </div>
                                <span
                                    className="delete-cart"
                                    onClick={() => removeFromCart(product)}
                                >
                                    <img className="trash" src="/images/trash.png"/>
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="payment-summary">
                    <h2>Payment summary</h2>
                    <div>Total Price: {totalPrice} €</div>
                    <button className="payment-button">Proceed to Payment</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
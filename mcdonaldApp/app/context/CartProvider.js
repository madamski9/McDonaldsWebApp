"use client"
import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [ cart, setCart ] = useState([])

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const generateUniqueId = (product) => {
        const ingredientsString = JSON.stringify(product.ingredients)
        return `${product.id}-${product.price}-${ingredientsString}`
    }

    const addToCart = (product) => {
        console.log("produkt: ", product)
        const uniqueId = generateUniqueId(product)
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.uniqueId === uniqueId) 
            if (existingProduct) {
                return prevCart.map(item =>
                    item.uniqueId === uniqueId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { ...product, uniqueId, quantity: 1 }]
            }
        })
    }

    const increaseQuantity = (product) => {
        const uniqueId = generateUniqueId(product)
        setCart((prevCart) =>
            prevCart.map(item =>
                item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    const decreaseQuantity = (product) => {
        const uniqueId = generateUniqueId(product)
        setCart((prevCart) =>
            prevCart.map(item =>
                item.uniqueId === uniqueId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        )
    }

    const removeFromCart = (product) => {
        const uniqueId = generateUniqueId(product)
        setCart((prev) => prev.filter((item) => item.uniqueId !== uniqueId))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

//! wlasny hook ktory upraszcza korzystanie z CartContext
export const useCart = () => useContext(CartContext)
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

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id)
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        )
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    console.log("koszyk: ", cart)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

//! wlasny hook ktory upraszcza korzystanie z CartContext
export const useCart = () => useContext(CartContext)
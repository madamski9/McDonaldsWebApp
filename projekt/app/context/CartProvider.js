"use client"
import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart((prev) => [...prev, product])
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    console.log("koszyk: ", cart)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

//! wlasny hook ktory upraszcza korzystanie z CartContext
export const useCart = () => useContext(CartContext)
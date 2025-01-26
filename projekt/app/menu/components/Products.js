"use client"
import { useState, useEffect } from "react"

const Products = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/database/database.json`)
            if (response.ok) {
                const products = await response.json()
                setProducts(products)
            } else {
                throw new Error("Failed to fetch products")
            }
        } catch (error) {
            console.error("Failed to fetch products", error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="order-page">
            <div className="grid-container">
                {products.map(item => (
                    <div key={item.id} className="grid-item">
                        <img src={item.image} alt={item.name} />
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;
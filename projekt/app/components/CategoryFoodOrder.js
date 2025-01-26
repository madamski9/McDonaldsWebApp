"use client"
import FetchProducts from "./FetchProducts"
import { useState, useEffect, useCallback } from "react"
import { useCart } from "../context/CartProvider"

const CategoryFoodOrder = ({ categoryClicked }) => {
    const [products, setProducts] = useState([])
    const { addToCart } = useCart()

    useEffect(() => {
        const getProducts = async () => {
            const { products } = await FetchProducts()
            const filteredProducts = products[categoryClicked] || []
            setProducts(filteredProducts)
        }
        getProducts()
    }, [categoryClicked])

    return (
        <div className="main-order">
            <div className="grid-container">
                {products.length > 0 ? (
                    products.map(product => (
                        <div 
                            key={product.id} 
                            className="grid-item"
                            onClick={() => addToCart(product)}
                        >
                            <img src={product.image} alt={product.name} />
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default CategoryFoodOrder
"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import FetchProducts from "./FetchProducts"

const Products = () => {
    const [products, setProducts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const getProducts = async () => {
            const { products } = await FetchProducts()
            setProducts(products)
        }
        getProducts()
    }, [])

    const handleItemClick = useCallback((id) => {
        router.push(`/menu/${id}`)
    }, [router])

    const processedProducts = useMemo(() => {
        if (!products || Object.keys(products).length === 0) return []
        return Object.keys(products).flatMap(category => 
            Array.isArray(products[category]) ? products[category] : []
        )
    }, [products])

    return (
        <div className="order-page">
            <div className="grid-container">
                {processedProducts.map(product => (
                    <div 
                        key={product.id} 
                        className="grid-item"
                        onClick={() => handleItemClick(product.id)}
                    >
                        <img src={product.image} alt={product.name} />
                        <div>{product.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const Products = () => {
    const [products, setProducts] = useState([])
    const router = useRouter()

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

    const handleItemClick = (id) => {
        router.push(`/menu/${id}`)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    console.log(products)

    return (
        <div className="order-page">
            <div className="grid-container">
                {Object.keys(products).map(category => (
                    products[category].map(product => (
                        <div 
                            key={product.id} 
                            className="grid-item"
                            onClick={() => handleItemClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} />
                            <div>{product.name}</div>
                        </div>
                        ))
                    ))}
            </div>
        </div>
    )
}

export default Products;
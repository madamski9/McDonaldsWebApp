"use client"
import { useState, useEffect } from "react"
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

    const handleItemClick = (id) => {
        router.push(`/menu/${id}`)
    }
    console.log("chuj", products)

    return (
        <div className="order-page">
            <div className="grid-container">
                {Object.keys(products).map(category => (
                    Array.isArray(products[category]) && products[category].map(product => (
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
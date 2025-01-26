"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductDetail = () => {
    const { id } = useParams()
    const [ product, setProduct ] = useState(null)

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/database/database.json`)
                    if (response.ok) {
                        const products = await response.json()
                        const product = products.find(p => p.id === parseInt(id))
                        setProduct(product)
                    } else {
                        throw new Error("Failed to fetch product")
                    }
                } catch (error) {
                    console.error("Failed to fetch product", error)
                }
            }

            fetchProduct()
        }
    }, [id])

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
            <img src={product.image} alt={product.name} />
        </div>
    )
}

export default ProductDetail;
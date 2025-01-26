"use client"
import { useState, useEffect, useMemo } from "react"
import FetchProducts from "./FetchProducts"

const CategoryOrder = ({ setCategoryClicked }) => {
    const [products, setProducts] = useState([])
    const [categoryImages, setCategoryImages] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const { products, categoryImages } = await FetchProducts()
            setProducts(products)
            setCategoryImages(categoryImages)
        }
        getProducts()
    }, [])

    const categories = useMemo(() => Object.keys(products), [products])

    return (
        <div className="category-order-main">
            {categories.map(category => (
                <div 
                    key={category} 
                    className="category-order-item"
                    onClick={() => setCategoryClicked(category)}
                >
                    <img src={categoryImages[category]} alt={category} />
                    <div>{category}</div>
                </div>
            ))}
        </div>
    )
}

export default CategoryOrder
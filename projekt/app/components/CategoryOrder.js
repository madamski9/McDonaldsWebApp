"use client"
import { useState, useEffect } from "react"
import FetchProducts from "./FetchProducts"

const CategoryOrder = () => {
    const [products, setProducts] = useState([])
    const [categoryImages, setCategoryImages] = useState([])
    const [categoryClicked, setCategoryClicked] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            const { products, categoryImages } = await FetchProducts()
            setProducts(products)
            setCategoryImages(categoryImages)
        }
        getProducts()
    }, [])

    return (
        <div className="category-order-main">
            {Object.keys(products).map(category => (
                <div 
                    key={category} 
                    className="category-order-item"
                    onClick={() => setCategoryClicked(!categoryClicked)}
                >
                    <img src={categoryImages[category]} alt={category} />
                    <div>{category}</div>
                </div>
            ))}
        </div>
    )
}

export default CategoryOrder
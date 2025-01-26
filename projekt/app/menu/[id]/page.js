"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductDetail = () => {
    const { id } = useParams()
    const [ product, setProduct ] = useState(null)
    const [ nutrition, setNutrition ] = useState(null)
    const [ allergens, setAllergens ] = useState(null)

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/database/database.json`)
                    if (response.ok) {
                        const products = await response.json()
                        const allProducts = Object.keys(products).flatMap(category => products[category])
                        const product = allProducts.find(product => product.id === parseInt(id))
                        const nutrition = product.nutrition
                        const allergens = product.allergens
                        setProduct(product)
                        setNutrition(nutrition)
                        setAllergens(allergens)
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
        return <div style={{height: "500px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            Loading...</div>
    }

    return (
        <div className='product-detail'>
            <div className='product-info'>
                <h1>{product.name}</h1>
                <p>Price: {product.price}</p>
                <div className='nutrition'>
                    <div>Nutrition:</div>
                        <ul>
                            {nutrition && Object.keys(nutrition).map(key => (
                            <li key={key}>
                                {`${key}: ${nutrition[key]}`}
                            </li>
                            ))}
                        </ul>
                </div>
                <div className='allergens'>
                    <div>Allergens:</div>
                    <ul>
                        {allergens && allergens.map(allergen => (
                            <li key={allergen}>
                                {allergen}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='product-image'>
                <img src={product.image} alt={product.name} />
            </div>
        </div>
    )
}

export default ProductDetail;
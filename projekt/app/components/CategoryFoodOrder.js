"use client"
import FetchProducts from "./FetchProducts"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartProvider"

const CategoryFoodOrder = ({ categoryClicked }) => {
    const [ products, setProducts ] = useState([])
    const [ finalAddVisible, setFinalAddVisible ] = useState(false)
    const [ selectedProduct, setSelectedProduct ] = useState(null)
    const [ingredients, setIngredients] = useState([])
    const { addToCart, cart } = useCart()

    const getProductQuantity = (id) => {
        const productInCart = cart.find(item => item.id === id)
        return productInCart ? <span>x{productInCart.quantity}</span> : <div></div>
    }

    const handleAddToCart = () => {
        addToCart(selectedProduct)
        setFinalAddVisible(false)
    }

    const fetchIngredients = (product) => {
        const ingredients = Object.keys(product.ingredients).map(key => {
            return (
                <div key={key} className="ingredient-row">
                    <div className="ingredient-key">
                        {key}: 
                    </div>
                    <div className="ingredient-value">
                        {product.ingredients[key]}
                    </div>
                </div>
            )
        })
        setIngredients(ingredients)
    }

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
                            onClick={() => {
                                setFinalAddVisible(true)
                                setSelectedProduct(product)
                                fetchIngredients(product)
                            }}
                        >
                            <img src={product.image} alt={product.name} />
                            <div>
                                {getProductQuantity(product.id)}
                            </div>
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                        </div>
                    ))
                ) : (
                    null
                )}
                {finalAddVisible && selectedProduct && (
                    <div className="final-add">
                        <div className="modal-content">
                            <div className="close-button" onClick={() => setFinalAddVisible(false)}>
                                <div className="x" >
                                    <img src="/images/close.png"/>
                                </div>
                            </div>
                            <img src={selectedProduct.image} alt={selectedProduct.name} />
                            <div>{selectedProduct.name}</div>
                            <div>{selectedProduct.price}</div>
                            <div className="ingredients">
                                <h3>Ingredients:</h3>
                                {ingredients}
                            </div>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                            <button onClick={() => setFinalAddVisible(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryFoodOrder
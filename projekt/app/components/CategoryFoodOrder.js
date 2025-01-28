"use client"
import FetchProducts from "./FetchProducts"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartProvider"

const CategoryFoodOrder = ({ categoryClicked }) => {
    const [products, setProducts] = useState([])
    const [finalAddVisible, setFinalAddVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { addToCart, cart } = useCart()

    const handleClick = (product) => {
        setSelectedProduct(product)
        setFinalAddVisible(true)
    }

    const handleAddToCart = () => {
        addToCart(selectedProduct)
        console.log(selectedProduct)
        setFinalAddVisible(false)
    }

    const handleIncreaseQuantity = (price, ingredientKey) => {
        price = parseFloat(price.replace(" €", ""))
        setSelectedProduct(prevProduct => {
            const updatedIngredients = {
                ...prevProduct.ingredients,
                [ingredientKey]: {
                    ...prevProduct.ingredients[ingredientKey],
                    quantity: prevProduct.ingredients[ingredientKey].quantity + 1
                }
            }
            return {
                ...prevProduct,
                ingredients: updatedIngredients,
                price: (parseFloat(prevProduct.price.replace(" €", "")) + price).toFixed(2) + " €"
            }
        })
    }

    const handleDecreaseQuantity = (price, ingredientKey) => {
        price = parseFloat(price.replace(" €", ""))
        setSelectedProduct(prevProduct => {
            const updatedIngredients = {
                ...prevProduct.ingredients,
                [ingredientKey]: {
                    ...prevProduct.ingredients[ingredientKey],
                    quantity: Math.max(prevProduct.ingredients[ingredientKey].quantity - 1, 0)
                }
            }
            return {
                ...prevProduct,
                ingredients: updatedIngredients,
                price: (parseFloat(prevProduct.price.replace(" €", "")) - price).toFixed(2) + " €"
            }
        })
    }

    useEffect(() => {
        const getProducts = async () => {
            const { products } = await FetchProducts()
            const filteredProducts = products[categoryClicked] || []
            setProducts(filteredProducts)
        }
        getProducts()
    }, [categoryClicked])

    const getProductQuantity = (productId) => {
        const productInCart = cart.find(item => item.id === productId)
        return productInCart ? productInCart.quantity : 0
    }

    return (
        <div className="main-order">
            <div className="grid-container">
                {products.length > 0 ? (
                    products.map(product => (
                        <div 
                            key={product.id} 
                            className="grid-item"
                            onClick={() => handleClick(product)}
                        >
                            <img src={product.image} alt={product.name} />
                            <div>
                                Quantity: {getProductQuantity(product.id)}
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
                                <div className="x">
                                    <img src="/images/close.png"/>
                                </div>
                            </div>
                            <img src={selectedProduct.image} alt={selectedProduct.name} />
                            <div>{selectedProduct.name}</div>
                            <div>{(parseFloat(selectedProduct.price.replace(" €", ""))).toFixed(2)} €</div>
                            <div className="ingredients">
                                <h3>Ingredients:</h3>
                                {Object.keys(selectedProduct.ingredients).map(key => (
                                    <div key={key} className="ingredient-row">
                                        <div className="ingredient-key">
                                            {key}: 
                                        </div>
                                        <div className="ingredient-value">
                                            <p style={{marginRight: "30px"}}>
                                                {selectedProduct.ingredients[key].quantity}
                                            </p>
                                            <p>
                                                {selectedProduct.ingredients[key].price}
                                            </p>
                                            <button
                                                onClick={() => handleDecreaseQuantity(selectedProduct.ingredients[key].price, key)}
                                                className="num-of-ingredients"
                                            >-</button>
                                            <button
                                                className="num-of-ingredients"
                                                onClick={() => handleIncreaseQuantity(selectedProduct.ingredients[key].price, key)}
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="modal-bottom1" onClick={handleAddToCart}>Add to Cart</button>
                            <button className="modal-bottom2" onClick={() => setFinalAddVisible(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryFoodOrder
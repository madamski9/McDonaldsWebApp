"use client"
import { useCart } from "../context/CartProvider"
import TotalPrice from "../components/TotalPrice"
import { useState } from "react"
import { jsPDF } from "jspdf"
import { useRouter } from "next/navigation"

const Payment = () => {
    const { cart, clearCart } = useCart()
    const [deliveryOption, setDeliveryOption] = useState("")
    const [tableNumber, setTableNumber] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value)
        if (event.target.value !== "table-service") {
            setTableNumber("")
        }
        if (event.target.value !== "home-delivery") {
            setAddress("")
            setCity("")
            setPostalCode("")
        }
    }

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value)
    }

    const generateAndOpenPDF = (orderDetails) => {
        const doc = new jsPDF()
        
        doc.setFontSize(16)
        doc.text("Potwierdzenie zamówienia", 10, 10)
    
        doc.setFontSize(12)
        doc.text(`Opcja dostawy: ${orderDetails.deliveryOption}`, 10, 20)
    
        if (orderDetails.deliveryOption === "home-delivery") {
            doc.text(`Adres: ${orderDetails.address}`, 10, 30)
            doc.text(`Miasto: ${orderDetails.city}`, 10, 40)
            doc.text(`Kod pocztowy: ${orderDetails.postalCode}`, 10, 50)
        } else if (orderDetails.deliveryOption === "table-service") {
            doc.text(`Numer stolika: ${orderDetails.tableNumber}`, 10, 30)
        }
        
        doc.setFontSize(12)
        doc.text(`Metoda platnosci: ${orderDetails.paymentMethod}`, 10, 60)
        doc.text("Zamówione produkty:", 10, 70); 

        Object.keys(cart).forEach((key, index) => {
            const product = cart[key];
            const line = `${index + 1}. ${product.name} - ${product.quantity} szt. - ${product.price}`;
            doc.text(line, 10, 80 + index * 10); 
        })
        const price = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.replace(" €", "")), 0).toFixed(2)
        doc.text(`Cena calkowita: ${price} €`, 10, 80 + Object.keys(cart).length * 10)
    
        const pdfBlob = doc.output("bloburl")
        window.open(pdfBlob, "_blank")
    }
    

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!deliveryOption || !paymentMethod) {
            setError("Complete all required fields.")
            return
        }
        if (deliveryOption === "home-delivery" && (!address || !city || !postalCode)) {
            setError("Fill in your address details for delivery options.")
            return
        }
        if (deliveryOption === "table-service" && !tableNumber) {
            setError("Please provide your table number for personal pickup.")
            return
        }
        const formData = {
            deliveryOption,
            tableNumber,
            address,
            city,
            postalCode,
            paymentMethod
        }
        console.log("Form Data Submitted: ", formData)
        generateAndOpenPDF(formData)
        clearCart()
        router.push("/")
    }

    const prepareTime = deliveryOption === "home-delivery" ? cart.length * 10 : cart.length * 2

    return (
        <div className="payment">
            <h1>Payment</h1>
            <form className="payment-container" onSubmit={handleSubmit}>
                <div className="payment-summary">
                    <h2>Payment summary</h2>
                    <div className="product-summary">
                        {Object.keys(cart).map(key => {
                            const product = cart[key]
                            return (
                                <div key={product.uniqueId} className="product-item">
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-price">{product.price}</div>
                                    <div className="product-quantity">Quantity: {product.quantity}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="prepare-time">
                        Prepare time: {prepareTime} min
                    </div>
                    <div className="total-and-pay">
                        <div className="total-price">
                            Total Price: <TotalPrice /> €
                        </div>
                        <button type="submit" className="payment-button">
                            Pay
                        </button>
                    </div>
                    {error && <div style={{color: "red", marginTop:"10px"}}>{error}</div>}
                </div>
                <div className="right-column">
                    <div className="delivery-options">
                        <h2>Delivery Options</h2>
                        <div className="method-item">
                            <input 
                                type="radio" 
                                id="table-service" 
                                name="delivery-option" 
                                value="table-service" 
                                checked={deliveryOption === "table-service"} 
                                onChange={handleDeliveryOptionChange} 
                            />
                            <label>Bring to Table</label>
                        </div>
                        {deliveryOption === "table-service" && (
                            <div className="table-number">
                                <label>Table Number:</label>
                                <input
                                    type="text"
                                    id="table-number"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="method-item">
                            <input type="radio" id="pickup" name="delivery-option" value="pickup" checked={deliveryOption === "pickup"} onChange={handleDeliveryOptionChange} />
                            <label>Pickup</label>
                        </div>
                        <div className="method-item">
                            <input type="radio" id="home-delivery" name="delivery-option" value="home-delivery" checked={deliveryOption === "home-delivery"} onChange={handleDeliveryOptionChange} />
                            <label>Home Delivery</label>
                        </div>
                        {deliveryOption === "home-delivery" && (
                            <div className="delivery-details">
                                <div className="delivery-item">
                                    <label>Address:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="delivery-item">
                                    <label>City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="delivery-item">
                                    <label>Postal Code:</label>
                                    <input
                                        type="text"
                                        id="postal-code"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="payment-methods">
                        <h2>Payment Methods</h2>
                        <div className="method-item">
                            <input type="radio" id="credit-card" name="payment-method" value="credit-card" onChange={handlePaymentMethodChange} />
                            <label>Credit Card</label>
                        </div>
                        <div className="method-item">
                            <input type="radio" id="paypal" name="payment-method" value="paypal" onChange={handlePaymentMethodChange} />
                            <label>PayPal</label>
                        </div>
                        <div className="method-item">
                            <input type="radio" id="bank-transfer" name="payment-method" value="bank-transfer" onChange={handlePaymentMethodChange} />
                            <label>Bank Transfer</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Payment
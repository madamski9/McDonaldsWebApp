import { useCart } from "../context/CartProvider"
import { useEffect, useState } from "react"

const TotalPrice = () => {
    const { cart } = useCart()
    const [ totalPrice, setTotalPrice ] = useState(0)

    useEffect(() => {
            const price = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.replace(" €", "")), 0).toFixed(2)
            setTotalPrice(price)
    }, [cart])

    return totalPrice
}

export default TotalPrice;
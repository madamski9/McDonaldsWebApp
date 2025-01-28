"use client"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const OrderButton = () => {
  const router = useRouter()

  const handleClick = () => {
    const loggedIn = Cookies.get("loggedIn")
    if (loggedIn) {
        router.push("/order")
    } else {
        alert("Please log in to place an order.")
    }
}

  return (
    <button 
        className="order-now-btn"
        onClick={() => handleClick()}
        >Order
    </button>
  )
}

export default OrderButton;
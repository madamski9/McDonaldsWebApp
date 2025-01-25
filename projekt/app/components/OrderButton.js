"use client"
import { useRouter } from "next/navigation"

const OrderButton = () => {
  const router = useRouter()

  return (
    <button 
        className="order-now-btn"
        onClick={() => router.push("/order")}
        >Order
    </button>
  )
}

export default OrderButton;
"use client"
import { useRouter } from "next/navigation"

const Menubutton = () => {
  const router = useRouter()

  return (
    <div 
        className="feature one"
        onClick={() => router.push("/menu")}
    >
        <img src="/images/menu.jpeg" alt="Feature 1" />
        <h2>Our Menu</h2>
        <p>Explore our wide range of delicious meals and beverages.</p>
    </div>
  )
}

export default Menubutton;
"use client"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <div 
            className="logo"
            onClick={() => (router.push("/"), console.log("clicked"))}
        >
            <img src="/images/mcdonalds.png" alt="McDonald's Logo" />
        </div>
    )
}

export default Logo
"use client"
import { useRouter } from "next/navigation"

const FaqButton = () => {
    const router = useRouter()
    return (
        <div 
            onClick={() => router.push("/faq")}
            className="feature three">
          <img src="/images/faq.jpeg" alt="Feature 3" />
          <h2>Faq</h2>
          <p>Your right to know</p>
        </div>
    )
}

export default FaqButton
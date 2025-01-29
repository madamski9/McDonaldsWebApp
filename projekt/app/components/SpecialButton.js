"use client"
const SpecialButton = () => {
    return (
        <div 
            className="feature two"
            onClick={() => alert("No special deals yet.")}
        >
            <img src="/images/special2.png" alt="Feature 2" />
            <h2>Special Offers</h2>
            <p>Check out our latest promotions and special deals.</p>
        </div>
    )
}

export default SpecialButton
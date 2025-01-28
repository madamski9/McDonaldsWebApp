"use client"
import Logo from "./Logo"
import Cart from "./Cart"
import { useState } from "react"

const Navigation = () => {
    const [cartVisible, setCartVisible] = useState(false)

    return (
        <nav className="navigation">
            <div className="menu">
                <ul>
                    <div>Menu</div>
                    <div>About</div>
                </ul>
            </div>
            <Logo />
            <div className="user-profile">
                <ul>
                    <div 
                        className="cart"
                        onClick={() => setCartVisible(!cartVisible)}
                    >
                        <img src="/images/shopping-cart.png"/>
                    </div>
                    <img src="/images/user-2.png" alt="User Profile" />
                </ul>
                {cartVisible && <Cart setCartVisible={setCartVisible}/>}
            </div>
        </nav>
    )
}

export default Navigation
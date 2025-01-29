"use client"
import Logo from "./Logo"
import Cart from "./Cart"
import User from "./User"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const Navigation = () => {
    const [cartVisible, setCartVisible] = useState(false)
    const [userVisible, setUserVisible] = useState(false)
    const router = useRouter()
    const [username, setUsername] = useState("")

    const handleLogout = () => {
        Cookies.remove("username")
        Cookies.remove("loggedIn")
        setUsername("")
        router.push("/")
        window.location.reload()
    }

    const handleUserVisible = useCallback(() => {
        setUserVisible(!userVisible)
    }, [userVisible])

    const handleCartVisible = useCallback(() => {
        setCartVisible(!cartVisible)
    }, [cartVisible])

    useEffect(() => {
        const storedUsername = Cookies.get("username")
        if (storedUsername) {
            setUsername(storedUsername)
        } else {
            setUsername("")
        }
    }, [])

    return (
        <nav className="navigation">
            <div className="menu">
                <ul>
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => router.push("/menu")}
                    >Menu</div>
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => router.push("/faq")}
                    >About</div>
                </ul>
            </div>
            {username ? (
                <div className="logo-container">
                    <Logo />
                </div>
            ) : (
                <Logo />
            )}
            <div className="user-profile">
                <ul>
                {typeof window !== 'undefined' && username && <div>Welcome, {username}</div>}
                        {username && (
                            <button
                                className="logout-button"
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </button>
                        )}
                    <div 
                        className="cart"
                        onClick={() => handleCartVisible()}
                    >
                        <img src="/images/shopping-cart.png"/>
                    </div>
                    <div
                        onClick={() => handleUserVisible()}
                    >
                        <img src="/images/user-2.png" alt="User Profile" />
                    </div>
                </ul>
                {cartVisible && <Cart setCartVisible={setCartVisible}/>}
                {userVisible && <User setUserVisible={setUserVisible}/>}
            </div>
        </nav>
    )
}

export default Navigation
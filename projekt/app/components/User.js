"use client"
import { useState } from "react"
import Cookies from "js-cookie"

const User = ({ setUserVisible }) => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleLogin = (event) => {
        event.preventDefault()
        console.log("Logging in with", { username, password })
        Cookies.set("username", username, { expires: 10 / 1440 }) //! 10 minut
        Cookies.set("loggedIn", true, { expires: 10 / 1440 })
        setUserVisible(false)
        window.location.reload()
    }

    return (
        <div 
            className="overlay"
            onClick={() => setUserVisible(false)}
        >
            <div className="user" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    )
}

export default User
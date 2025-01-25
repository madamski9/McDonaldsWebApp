import Logo from "./Logo"

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="menu">
                <ul>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <Logo />
            <div className="user-profile">
                <img src="/images/user-2.png" alt="User Profile" />
            </div>
        </nav>
    )
}

export default Navigation
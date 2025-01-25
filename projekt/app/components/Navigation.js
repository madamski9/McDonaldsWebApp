const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="logo">
                <img src="/images/mcdonalds.png" alt="McDonald's Logo" />
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="menu">
                <ul>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div className="user-profile">
                <img src="/images/user-2.png" alt="User Profile" />
            </div>
        </nav>
    )
}

export default Navigation
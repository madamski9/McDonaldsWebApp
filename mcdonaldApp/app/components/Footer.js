const Footer = () =>{
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>McDonald's is the world's leading global foodservice retailer with over 36,000 locations in over 100 countries.</p>
                </div>
                <div className="footer-section logo">
                    <img src="/images/mcdonalds.png" alt="McDonald's Logo" />
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: support@mcdonalds.com</p>
                    <p>Phone: +1 800 244 6227</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2025 McDonald's. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
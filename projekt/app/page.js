const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <button className="order-now-btn">Order Now</button>
      </header>
      <section className="features-section">
        <div className="feature">
          <img src="/path/to/feature1.jpg" alt="Feature 1" />
          <h2>Our Menu</h2>
          <p>Explore our wide range of delicious meals and beverages.</p>
        </div>
        <div className="feature">
          <img src="/path/to/feature2.jpg" alt="Feature 2" />
          <h2>Special Offers</h2>
          <p>Check out our latest promotions and special deals.</p>
        </div>
        <div className="feature">
          <img src="/path/to/feature3.jpg" alt="Feature 3" />
          <h2>Find a Restaurant</h2>
          <p>Locate the nearest McDonald's restaurant to you.</p>
        </div>
      </section>
    </div>
  )
}
export default HomePage
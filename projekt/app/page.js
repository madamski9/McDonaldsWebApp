import OrderButton from "./components/OrderButton"

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="banner-container">
          <img className="banner" src="/images/mcbanner.png"/>
            <OrderButton />
        </div>
      </header>
      <section className="features-section">
        <div className="feature one">
          <img src="/images/menu.jpeg" alt="Feature 1" />
          <h2>Our Menu</h2>
          <p>Explore our wide range of delicious meals and beverages.</p>
        </div>
        <div className="feature two">
          <img src="/images/special2.png" alt="Feature 2" />
          <h2>Special Offers</h2>
          <p>Check out our latest promotions and special deals.</p>
        </div>
        <div className="feature three">
          <img src="/images/faq.jpeg" alt="Feature 3" />
          <h2>Faq</h2>
          <p>Your right to know</p>
        </div>
      </section>
    </div>
  )
}
export default HomePage
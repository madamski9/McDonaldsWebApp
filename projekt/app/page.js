import OrderButton from "./components/OrderButton"
import MenuButton from "./components/MenuButton"

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="banner-container">
          <img className="banner" src="/images/mcbanner.png"/>
            <div className="banner-title">McDonald's</div>
            <div className="banner-info">Your favorite place for delicious food and great moments.</div>
            <OrderButton />
        </div>
      </header>
      <section className="features-section">
        <MenuButton />
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
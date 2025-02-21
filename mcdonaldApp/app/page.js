import OrderButton from "./components/OrderButton"
import MenuButton from "./components/MenuButton"
import FaqButton from "./components/FaqButton"
import SpecialButton from "./components/SpecialButton"

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
        <SpecialButton />
        <FaqButton />
      </section>
    </div>
  )
}
export default HomePage
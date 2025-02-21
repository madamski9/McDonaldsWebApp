import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import { CartProvider } from "./context/CartProvider"
import "../styles/globals.css"

const Layout = ({ children }) => {
  return (
    <html lang="pl">
      <body>
        <CartProvider>
          <Navigation/>
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  )
}

export default Layout
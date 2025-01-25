import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import "../styles/globals.css"

const Layout = ({ children }) => {
  return (
    <html lang="pl">
      <body>
        <Navigation/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}

export default Layout
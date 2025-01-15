import "./globals.css"
import Navigation from "./components/Navigation"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1>Pokemon Api</h1>
          <nav>
            <Navigation />
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}

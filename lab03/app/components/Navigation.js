import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pokemon">Pokemon</Link>
        </li>
        <li>
          <Link href="/favourites">Favorites</Link>
        </li>
      </ul>
    </nav>
  )
}

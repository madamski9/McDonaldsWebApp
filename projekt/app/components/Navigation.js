"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Navigation() {
  const [params] = useSearchParams()
  console.log(params)

  const createQueryString = (type) => {
    const newParams = new URLSearchParams()
    newParams.set('type', type) 
    
    return newParams.toString() 
  }

  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pokemon">Pokemons</Link>
        </li>
        <li>
          <Link href="/favourites">Favorites</Link>
        </li>
      </ul>
      <ul className='nav-list2'>
        <li>
          <Link
            href={`/pokemon?${createQueryString('fire')}`}
          >
            Fire
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('grass')}`}
          >
            Grass
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('dark')}`}
          >
            Dark
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('bug')}`}
          >
            Bug
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('ghost')}`}
          >
            Ghost
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('normal')}`}
          >
            Normal
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('flying')}`}
          >
            Flying
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('fighting')}`}
          >
            Fighting
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('poison')}`}
          >
            Poison
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('ground')}`}
          >
            Ground
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('rock')}`}
          >
            Rock
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('steel')}`}
          >
            Steel
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('water')}`}
          >
            Water
          </Link>
        </li>
        <li>
          <Link
            href={`/pokemon?${createQueryString('electric')}`}
          >
            Electric
          </Link>
        </li>
      </ul>
    </nav>
  )
}

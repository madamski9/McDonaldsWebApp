"use client"
import Link from 'next/link';
import React, { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';

export default function FavouritesPage() {
    const [favouritePokemons, setFavouritePokemons] = useState([])
    const searchParams = useSearchParams()
    const sort = searchParams.get("sort")

    const fetchPokemons = async (favPokemon) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon/${favPokemon}`) 
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const fetchFavouritePokemons = async () => {
        const savedCheckedPokemons = localStorage.getItem("isChecked")
        if (savedCheckedPokemons) {
            const parsedCheckedPokemons = JSON.parse(savedCheckedPokemons)
            
            const favouriteList = Object.keys(parsedCheckedPokemons).filter(
                (pokemon) => parsedCheckedPokemons[pokemon] === true)

            const pokemonDetails = await Promise.all(
                favouriteList.map((pokemonName) => fetchPokemons(pokemonName)))

            setFavouritePokemons(pokemonDetails)
        }
    }

    const handleChange = async (pokemonName) => {
        const data = JSON.parse(localStorage.getItem("isChecked"))
        console.log(Object.keys(data))
        delete data[pokemonName]
        localStorage.setItem("isChecked", JSON.stringify(data))
        const filteredList = Object.keys(data).filter(pokemon => pokemon != pokemonName)
        console.log(filteredList)
        const pokemonDetails = await Promise.all(
            filteredList.map((pokemon) => fetchPokemons(pokemon))
        )
        setFavouritePokemons(pokemonDetails)
    }

    useEffect(() => {
        fetchFavouritePokemons()
    }, [])

    return (
        <div className='main'>
            <div className="gridContainer">
                {favouritePokemons.length > 0 ? (
                    favouritePokemons
                    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : 0)
                    .map((pokemon) => (
                        <div key={pokemon.name} className="mainPokemon">
                            <Link href={`/pokemon/${pokemon.name}`}>
                                <li className="clickable">
                                    <img
                                        src={pokemon.sprites?.front_default || "brak obrazka"}
                                        alt={pokemon.name}
                                        className="pokemonImg"
                                    />
                                    <div className="pokemonNames">
                                        #{pokemon.id} {pokemon.name}
                                    </div>
                                </li>
                            </Link>
                            <label className="star-label">
                                <input 
                                    type="checkbox" 
                                    className="star-checkbox" 
                                    checked={JSON.parse(localStorage.getItem("isChecked"))[pokemon.name] || false}
                                    onChange={() => handleChange(pokemon.name)}
                                />
                                <div className="star"></div>
                            </label>
                        </div>
                    ))
                ) : (
                    <p>Nie masz jeszcze ulubionych pokemonów.</p>
                )}
            </div>
        </div>
    );
    
}

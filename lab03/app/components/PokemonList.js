"use client"
import Link from 'next/link';
import React, { useState } from "react"

export default function PokemonList({ pokemonList }) {
    const [ favPokemons, setFavPokemons ] = useState([])
    console.log(favPokemons)

    const toggleFavourite = (pokemon) => {
        console.log(`dodano ${pokemon.name} do ulubionych`)
        setFavPokemons((prevFavs) => {
            if (prevFavs.some((fav) => fav.name === pokemon.name)) {
                console.log(`usunieta ${pokemon.name} z ulubionych`)
                return prevFavs.filter((fav) => fav.name !== pokemon.name);
            } else {
                console.log(`dodano ${pokemon.name} do ulubionych`)
                return [...prevFavs, pokemon];
            }
        })
    }

    return (
        <div className='main'>
            <section className="pokemon-list">
                <h3>Lista Pokemonów</h3>
                <ul>
                    {pokemonList.map((pokemon) => (
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
                                    checked={favPokemons.some((fav) => fav.name === pokemon.name)} 
                                    onChange={() => toggleFavourite(pokemon)}  
                                />
                                <div className="star"></div>
                            </label>
                        </div>
                    ))}
                </ul>
            </section>

        </div>
    );
}

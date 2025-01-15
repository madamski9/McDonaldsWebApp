"use client"
import Link from 'next/link';
import React, { useState, useEffect } from "react"

export default function PokemonList({ pokemonList }) {
    const [isChecked, setIsChecked] = useState({})

    const handleChange = (pokemon) => (event) => {
        const newCheckedState = {
            ...isChecked,
            [pokemon]: event.target.checked
        };

        setIsChecked(newCheckedState)
        console.log(isChecked)
        localStorage.setItem('isChecked', JSON.stringify(newCheckedState))
    }

    useEffect(() => {
        const savedCheckedPokemons = localStorage.getItem('isChecked');
        try {
            if (savedCheckedPokemons) {
                const parsedCheckedPokemons = JSON.parse(savedCheckedPokemons);
                console.log("dane po parsowaniu:", parsedCheckedPokemons);
                setIsChecked(parsedCheckedPokemons || {});
            }
        } catch (error) {
            console.error("blad", error);
            localStorage.removeItem('isChecked'); 
        }
    }, []);

    if (!pokemonList || pokemonList.length === 0) {
        return <div>Ładowanie...</div>;
    }

    return (
        <div className='main'>
            <section className="pokemon-list">
                <h3>Lista Pokemonów</h3>
                <div className="gridContainer">
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
                                    checked={isChecked[pokemon.name] ?? false}
                                    onChange={handleChange(pokemon.name)}
                                />
                                <div className="star"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

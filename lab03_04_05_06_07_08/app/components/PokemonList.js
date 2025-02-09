"use client"

import Link from 'next/link';
import React, { useState, useEffect } from "react"

export default function PokemonList({ pokemonList, toggleSelectForComparison, isComparisonMode }) {
    const [isChecked, setIsChecked] = useState({})

    const handleFavoriteChange = (pokemon) => (event) => {
        const newCheckedState = {
            ...isChecked,
            [pokemon]: event.target.checked
        };

        setIsChecked(newCheckedState)
        localStorage.setItem('isChecked', JSON.stringify(newCheckedState))
    }

    useEffect(() => {
        const savedCheckedPokemons = localStorage.getItem('isChecked');
        try {
            if (savedCheckedPokemons) {
                const parsedCheckedPokemons = JSON.parse(savedCheckedPokemons);
                setIsChecked(parsedCheckedPokemons || {});
            }
        } catch (error) {
            console.error("Błąd podczas odczytu z localStorage", error);
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
                        <div 
                            key={pokemon.name} 
                            className={`mainPokemon ${isComparisonMode ? 'clickable' : ''}`} 
                            onClick={() => isComparisonMode && toggleSelectForComparison(pokemon)}
                        >
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
                                    onChange={handleFavoriteChange(pokemon.name)}
                                    onClick={(e) => e.stopPropagation()} 
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

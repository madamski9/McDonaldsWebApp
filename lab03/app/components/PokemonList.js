"use client"
import Link from 'next/link';

export default function PokemonList({ pokemonList }) {
    let favouritePokemons = [];

    const addFavourite = (pokemonName) => {
        if (!favouritePokemons.includes(pokemonName)) {
            favouritePokemons.push(pokemonName);
        }
    };

    const handleAddToFavourite = (pokemon) => {
        addFavourite(pokemon.name) 
        console.log(`dodajesz ${pokemon.name} do ulubionych`)
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
                                    onChange={() => handleAddToFavourite(pokemon)} 
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

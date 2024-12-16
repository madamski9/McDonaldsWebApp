const PokemonList = ({ pokemonList, onPokemonClick }) => {
    return (
        <ul id="pokemon-list">
            {pokemonList.map((pokemon) => (
                <li 
                    key={pokemon.name} 
                    className="clickable" 
                    onClick={() => onPokemonClick(pokemon)}
                >
                    <img 
                        src={pokemon.sprites?.front_default || "brak obrazka"} 
                        className="pokemonImg"
                        alt={pokemon.name}
                    />
                    <div className="pokemonNames">
                        #{pokemon.id} {pokemon.name ? pokemon.name : "Nieznany Pokemon"}
                    </div>
                </li>
            ))}
        </ul>
    );
};

window.PokemonList = PokemonList;
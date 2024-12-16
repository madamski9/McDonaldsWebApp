const PokemonList = ({ pokemonList, onPokemonClick }) => {
    return (
        <ul id="pokemon-list">
            {pokemonList.map((pokemon, index) => (
                <li 
                    key={index} 
                    className="clickable" 
                    onClick={() => onPokemonClick(pokemon)}
                >
                    {pokemon.sprites && pokemon.sprites.front_default ? ( 
                        <img 
                            src={pokemon.sprites.front_default} 
                            className="pokemonImg"
                            alt={pokemon.name}
                        />
                    ) : (
                        <span>Brak obrazka</span>
                    )}
                    <div className="pokemonNames">
                        {pokemon.name ? pokemon.name : "Nieznany Pokemon"}
                    </div>
                </li>
            ))}
        </ul>
    );
};

window.PokemonList = PokemonList;
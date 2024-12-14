function PokemonList({ pokemonList, onPokemonClick }) {
    return (
        <ul className="pokemon-list">
            {pokemonList.map(pokemon => (
                <li key={pokemon.name} className="clickable" onClick={() => onPokemonClick(pokemon.name)}>
                    {pokemon.name}
                </li>
            ))}
        </ul>
    );
}

export default PokemonList;
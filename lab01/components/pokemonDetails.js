function PokemonDetails({ pokemon }) {
    return (
        <div className="pokemon-details">
            <h4>{pokemon.name}</h4>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        </div>
    );
}

export default PokemonDetails;
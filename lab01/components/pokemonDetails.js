const PokemonDetails = ({ details }) => {
    if (!details) {
        return <p>Wybierz Pokemona, aby zobaczyć szczegóły.</p>;
    }

    return (
        <div id="pokemon-details">
            <h4>{details.name}</h4>
            {details.sprites && details.sprites.front_default ? (
                <img src={details.sprites.front_default} alt={details.name} />
            ) : (
                <span>Brak obrazka</span>
            )}
            <p>Height: {details.height}</p>
            <p>Weight: {details.weight}</p>
            <p>Type: {details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        </div>
    );
};

window.PokemonDetails = PokemonDetails;
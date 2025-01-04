"use client"

export default function PokemonDetails({ details }) {
    return (
        <div className="main">
            <section className="pokemon-details">
                <h4>{details.name}</h4>
                {details.sprites && details.sprites.front_default ? (
                    <img src={details.sprites.front_default} alt={details.name} className="pokemon-details-img" />
                ) : (
                    <span>Brak obrazka</span>
                )}
                <p>Height: {details.height}</p>
                <p>Weight: {details.weight}</p>
                <p>Type: {details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            </section>
        </div>
    )
  }
  
export default function FavoritesPage({ pokemon }) {
  if (!pokemon) {
      return <p>You have no favorite pokemons</p>; 
  }

  return (
      <div>
          <h3>Your Favorite Pokemon</h3>
          <p>Here you can find all your favorite Pokemon!</p>
          {pokemon.length === 0 ? (
              <p>You have no favorite Pokemon yet.</p>
          ) : (
              <ul>
                  {pokemon.map((pokemonName, index) => (
                      <li key={index}>{pokemonName}</li>
                  ))}
              </ul>
          )}
      </div>
  );
}

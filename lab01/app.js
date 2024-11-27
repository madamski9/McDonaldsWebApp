async function fetchPokemonList() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
        const data = await response.json()
        return data.results
    } catch(error) {
        console.error(error)
    }
}

async function fetchPokemonDetails(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const data = await response.json()
        return data
    } catch(error) {
        console.error(error)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const pokemonListElement = document.getElementById('pokemon-list');

    const pokemonList = await fetchPokemonList();
    if (pokemonList) {
        pokemonList.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            pokemonListElement.appendChild(listItem);
        });
    }
});
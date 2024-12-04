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

async function initPokemonList() {
    const pokemonListElement = document.getElementById('pokemon-list');
    const pokemonDetailsElement = document.getElementById('pokemon-details');
    const searchInput = document.querySelector('.search');
    const pokemonList = await fetchPokemonList();
    if (pokemonList) {
        pokemonList.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            listItem.classList.add('clickable');
            listItem.addEventListener('click', async () => {
                const pokemonDetails = await fetchPokemonDetails(pokemon.name);
                displayPokemonDetails(pokemonDetails, pokemonDetailsElement);
            });
            pokemonListElement.appendChild(listItem);
        });
    }
}

function displayPokemonDetails(details, element) {
    element.innerHTML = `
        <h4>${details.name}</h4>
        <img src="${details.sprites.front_default}" alt="${details.name}">
        <p>Height: ${details.height}</p>
        <p>Weight: ${details.weight}</p>
        <p>Type: ${details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
}

initPokemonList();
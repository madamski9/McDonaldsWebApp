async function fetchPokemonList(limit, offset) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
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

let limit = 20
let offset = 0
async function initPokemonList() {
    const pokemonListElement = document.getElementById("pokemon-list")
    const pokemonDetailsElement = document.getElementById("pokemon-details")
    
    pokemonListElement.innerHTML = ""
    
    const pokemonList = await fetchPokemonList(limit, offset)
    if (pokemonList) {
        for (const pokemon of pokemonList) {
            const pokemonDetails = await fetchPokemonDetails(pokemon.name)
            const listItem = document.createElement("div")
            listItem.classList.add("clickable")
            listItem.innerHTML = `
                <img src="${pokemonDetails.sprites.front_default}" class="pokemonImg" alt="${pokemon.name}">
                <div class="pokemonNames">#${pokemonDetails.id} ${pokemon.name}</div>
            `
            listItem.addEventListener("click", async () => {
                displayPokemonDetails(pokemonDetails, pokemonDetailsElement)
            })
            pokemonListElement.appendChild(listItem)
        }
    }
}

document.getElementById("prev-button").addEventListener("click", () => {
    if (offset > 0) {
        offset -= 20
        console.log(offset)
        initPokemonList()
    }
})
document.getElementById("next-button").addEventListener("click", () => {
    offset += 20
    console.log(offset)
    initPokemonList()
})
document.querySelector(".search").addEventListener("input", async (event) => {
    const pokemonName = event.target.value.toLowerCase()
    if (pokemonName) {
        const pokemonDetails = await fetchPokemonDetails(pokemonName)
        if (pokemonDetails) {
            const pokemonDetailsElement = document.getElementById("pokemon-details")
            displayPokemonDetails(pokemonDetails, pokemonDetailsElement)
        }
    }
})

function displayPokemonDetails(details, element) {
    element.innerHTML = `
        <h4>${details.name}</h4>
        <img src="${details.sprites.front_default}" alt="${details.name}">
        <p>Height: ${details.height}</p>
        <p>Weight: ${details.weight}</p>
        <p>Type: ${details.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
    `
}

initPokemonList()
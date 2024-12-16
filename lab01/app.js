const { useEffect } = React

let pokemonList = []
let pokemonDetails = null
let offset = 0
const limit = 20

async function fetchPokemonList(limit, offset) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        const data = await response.json()

        const detailedPokemonList = await Promise.all(
            data.results.map(async (pokemon) => {
                const pokemonDetailsResponse = await fetch(pokemon.url) 
                return pokemonDetailsResponse.json() 
            })
        )
        pokemonList = detailedPokemonList
        renderApp()
    } catch (error) {
        console.error(error)
    }
}


async function fetchPokemonDetails(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const data = await response.json()
        pokemonDetails = data
        renderApp()
    } catch(error) {
        console.error(error)
    }
}

function filterPokemon(searchTerm) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
}
let searchQuery = ''

const App = () => {
    useEffect(() => {
        const fetchData = async () => {
            await fetchPokemonList(limit, offset)
        }
        fetchData()
    }, [])

    const handlePokemonClick = async (pokemon) => {
        await fetchPokemonDetails(pokemon.name)
    }

    const handleSearchChange = (e) => {
        searchQuery = e.target.value
        pokemonDetails = null
        renderApp()
    }

    if (searchQuery) {
        const filteredPokemon = filterPokemon(searchQuery);
        if (filteredPokemon.length === 1) {
            fetchPokemonDetails(filteredPokemon[0].name);
        } else {
            pokemonDetails = null; 
        }
    }

    return (
        <>
            <div className="header">
                <section className="pokemon-search">
                    <h3>Wyszukiwarka Pokemonów</h3>
                    <input
                        type="text"
                        placeholder="Wpisz nazwę Pokemona..."
                        value={searchQuery}
                        onChange={handleSearchChange} 
                    />
                </section>
            </div>
            <div className="main">
                <section className="pokemon-list">
                    <h3>Lista Pokemonów</h3>
                    <PokemonList pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
                    <div className="pagination">
                        <button
                            id="prev-button"
                            onClick={() => {
                                if (offset > 0) {
                                    offset -= limit
                                    fetchPokemonList(limit, offset)
                                }
                            }}
                        >
                            ⬅️ Previous
                        </button>
                        <button
                            id="next-button"
                            onClick={() => {
                                offset += limit
                                fetchPokemonList(limit, offset)
                            }}
                        >
                            Next ➡️
                        </button>
                    </div>
                </section>
                <section className="pokemon-details">
                    <h3>Detale Pokemonów</h3>
                    <PokemonDetails details={pokemonDetails} />
                </section>
            </div>
        </>
    )
}


let root = null 

function renderApp() {
    if (!root) {
        const container = document.getElementById("root")
        root = ReactDOM.createRoot(container) 
    }
    root.render(<App />) 
}
  
renderApp()
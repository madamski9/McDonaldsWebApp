import PokemonList from "@/app/components/PokemonList"

export default async function PokemonPage() {
    const fetchPokemonList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}pokemon?limit=20&offset=0`)
            const data = await response.json()
    
            const detailedPokemonList = await Promise.all(
                data.results.map(async (pokemon) => {
                    const pokemonDetailsResponse = await fetch(pokemon.url) 
                    return pokemonDetailsResponse.json() 
                })
            )
            return detailedPokemonList
        } catch (error) {
            console.error(error)
            return []
        }
    }
    const pokemonList = await fetchPokemonList();

    return (
        <div>
            <PokemonList pokemonList={pokemonList} />
        </div>
    );
}
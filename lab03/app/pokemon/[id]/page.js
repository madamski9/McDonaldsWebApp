import PokemonDetails from "@/app/components/PokemonDetails"

export default async function PokemonDetailsPage({ params }) {
    try {
        const { id } = await params
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        return (
            <div>
                <PokemonDetails details={data}/>
            </div>
        )
    } catch(error) {
        return <div>Error: {error.message}</div>
    }
}
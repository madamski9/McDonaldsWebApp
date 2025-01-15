"use client"
import PokemonDetails from "@/app/components/PokemonDetails"
import PokemonStats from "@/app/components/PokemonStats"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"

export default function PokemonDetailsPage() {
    const [pokemonData, setPokemonData] = useState(null) 
    const params = useParams()
    const searchParams = useSearchParams()
    const view = searchParams.get("view")

    const fetchPokemonDetails = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon/${id}`)
            const data = await res.json()
            console.log("resStats: ", data.stats)
            setPokemonData(data)  
        } catch (error) {
            console.error(error)
        }
    }

    const handleClick = (view) => {
        console.log("click")
        const params = new URLSearchParams(window.location.search)
        params.set("view", view)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, "", newUrl)
    }

    useEffect(() => {
        fetchPokemonDetails(params.id)  
    }, [params])

    return (
        <div>
            {pokemonData ? (
                view === "stats" ? (
                    <div className="detailsInfo"> 
                        <PokemonStats stats={pokemonData.stats}/>
                        <button
                            className="detailsButton"
                            onClick={() => handleClick("details")}
                        >Details</button>
                    </div>
                ) : (
                    <div className="detailsInfo">
                        <PokemonDetails details={pokemonData} />
                        <button
                            className="detailsButton"
                            onClick={() => handleClick("stats")}
                        >Stats</button>
                    </div>
                )
            ) : (
                <p>Loading...</p> 
            )}
        </div>
    )
}

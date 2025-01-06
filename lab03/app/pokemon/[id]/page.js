"use client"
import PokemonDetails from "@/app/components/PokemonDetails"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"

export default function PokemonDetailsPage() {
    const [pokemonData, setPokemonData] = useState(null) 
    const [stats, setStats] = useState(null)
    const params = useParams()
    const searchParams = useSearchParams()

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
        if (params?.id) {
            fetchPokemonDetails(params.id)  
        }
    }, [params])

    useEffect(() => {
        const searchStats = searchParams.get("view")
        setStats(searchStats)
    }, [searchParams])

    return (
        <div>
            {pokemonData ? (
                <PokemonDetails details={pokemonData} />
            ) : (
                <p>Loading...</p> 
            )}
            <button
                onClick={() => handleClick("stats")}
            >Stats</button>
        </div>
    )
}

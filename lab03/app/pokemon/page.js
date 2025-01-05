"use client"

import PokemonList from "@/app/components/PokemonList"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function PokemonPage() {
    const [pokemonList, setPokemonList] = useState([])
    const [offsetValue, setOffsetValue] = useState(0)
    const [filteredPokemonList, setFilteredPokemonList] = useState([])
    const [inputValue, setInputValue] = useState("") 
    const params = useSearchParams()
    const type = params.get("type")
    const search = params.get("search")

    const fetchPokemonList = async (offset) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon?limit=21&offset=${offset}`)
            const data = await response.json()

            const detailedPokemonList = await Promise.all(
                data.results.map(async (pokemon) => {
                    const pokemonDetailsResponse = await fetch(pokemon.url) 
                    return pokemonDetailsResponse.json()
                }),
            )
           
            setPokemonList(detailedPokemonList)
            setFilteredPokemonList(detailedPokemonList)
        } catch (error) {
            console.error(error)
            setPokemonList([])
            setFilteredPokemonList([])
        }
    }

    const handleChange = (event) => {
        const query = event.target.value.toLowerCase()
        setInputValue(query) 

        const filtered = pokemonList.filter((pokemon) =>
            pokemon.name?.toLowerCase().includes(query)
        )
        setFilteredPokemonList(filtered)

        const params = new URLSearchParams()
        params.set("search", query)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, "", newUrl)
    }

    const handleClickLeft = () => {
        if (offsetValue > 0) {
            setOffsetValue(offsetValue - 21)
        }
    }

    const handleClickRight = () => {
        setOffsetValue(offsetValue + 21)
    }

    useEffect(() => {
        fetchPokemonList(offsetValue)
    }, [offsetValue])

    useEffect(() => {
        if (type) {
            const filtered = pokemonList.filter(pokemon =>
                pokemon.types.some(pokemonType => pokemonType.type.name === type)
            )
            setFilteredPokemonList(filtered)  
        } else {
            setFilteredPokemonList(pokemonList)  
        }
    }, [type, pokemonList])

    useEffect(() => {
        if (search) {
            setInputValue(search)
        }
    }, [search])

    return (
        <div className="header">
            <input
                className="input"
                type="text"
                placeholder="Search..."
                value={inputValue} 
                onChange={handleChange}
            />
            <PokemonList pokemonList={filteredPokemonList} /> 
            <div className="buttons">
                <button className="lt" onClick={handleClickLeft}>&lt;</button>
                <button className="gt" onClick={handleClickRight}>&gt;</button>
            </div>
        </div>
    )
}

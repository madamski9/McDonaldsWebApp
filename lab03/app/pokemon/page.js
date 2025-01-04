"use client"

import PokemonList from "@/app/components/PokemonList"
import React, { useState, useEffect } from "react"

export default function PokemonPage() {
    const [inputValue, setInputValue] = useState("")
    const [pokemonList, setPokemonList] = useState([])
    const [filteredPokemonList, setFilteredPokemonList] = useState([])
    console.log("doszlo tu")

    const fetchPokemonList = async () => {
        console.log("sprawdzam")
        try {
            console.log("pobieram url")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon?limit=21&offset=0`)
            const data = await response.json()
    
            console.log("api odpowiedz:", data)
    
            const detailedPokemonList = await Promise.all(
                data.results.map(async (pokemon) => {
                    const pokemonDetailsResponse = await fetch(pokemon.url); 
                    return pokemonDetailsResponse.json();
                })
            );
           
            setPokemonList(detailedPokemonList)
            setFilteredPokemonList(detailedPokemonList)
        } catch (error) {
            console.error(error)
            setPokemonList([])
            setFilteredPokemonList([])
        }
    }
    
    useEffect(() => {
        console.log("useEffect uruchomiony")
        fetchPokemonList()
    }, [])

    const handleChange = (event) => {
        const query = event.target.value.toLowerCase();
        setInputValue(query);
        try {
            const filtered = pokemonList.filter((pokemon) =>
                pokemon.name?.toLowerCase().includes(query)
            );
            setFilteredPokemonList(filtered);
        } catch (error) {
            console.error(error)
        }
    }

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
        </div>
    );
}

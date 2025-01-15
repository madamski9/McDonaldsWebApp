"use client"

import PokemonList from "@/app/components/PokemonList"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function PokemonPage() {
    const [pokemonList, setPokemonList] = useState([])
    const [offsetValue, setOffsetValue] = useState(0)
    const [filteredPokemonList, setFilteredPokemonList] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [inputLimitValue, setInputLimitValue] = useState("")
    const params = useSearchParams()
    const type = params.get("type")
    const search = params.get("search") 
    const limit = parseInt(params.get("limit") || "21", 10)
    const sort = params.get("sort")
    const compare = params.get("compare")

    const fetchPokemonList = async (offset, type, limit) => {
        try {
            let detailedPokemonList = []

            if (type) {
                const responseType = await fetch(`${process.env.NEXT_PUBLIC_API_URL}type/${type}`)
                const dataType = await responseType.json()

                const filteredByType = dataType.pokemon.map(item => ({
                    name: item.pokemon.name,
                    url: item.pokemon.url
                }))

                detailedPokemonList = await Promise.all(
                    filteredByType.map(async (pokemon) => {
                        const pokemonDetailsResponse = await fetch(pokemon.url)
                        return pokemonDetailsResponse.json()
                    })
                )
                detailedPokemonList = detailedPokemonList.slice(offset, offset + limit)
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pokemon?limit=${limit}&offset=${offset}`)
                const data = await response.json()

                detailedPokemonList = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const pokemonDetailsResponse = await fetch(pokemon.url)
                        return pokemonDetailsResponse.json()
                    })
                )
            }

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
        const params = new URLSearchParams(window.location.search)
        params.set("search", query)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, "", newUrl)
    }

    const handleLimitChange = (event) => {
        const query = event.target.value
        setInputLimitValue(query)

        const params = new URLSearchParams(window.location.search)
        params.set("limit", query)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, "", newUrl)
    }

    const handleClickLeft = () => (offsetValue > 0) ? setOffsetValue(offsetValue - limit) : null
    const handleClickRight = () => setOffsetValue(offsetValue + limit)

    const handleClickCompare = (state) => {
        console.log("compare dziala")
        const params = new URLSearchParams(window.location.search)
        params.set("compare", state)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, "", newUrl)
    }
    
    useEffect(() => { fetchPokemonList(offsetValue, type, limit) }, [offsetValue, type, limit])

    useEffect(() => {
        if (search) {
            setInputValue(search)
    
            const filtered = pokemonList.filter((pokemon) =>
                pokemon.name?.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredPokemonList(filtered)
        } else {
            setFilteredPokemonList(pokemonList)
        } 
    }, [search, pokemonList, limit])

    useEffect(() => { (limit) ? setInputLimitValue(limit) : null }, [limit])

    return (
        <div className="header">
            <div>
                <button
                    className="compareButton"
                    onClick={() => handleClickCompare("true")}
                >
                    Porownaj
                </button>
                <input
                    className="input"
                    type="text"
                    placeholder="Search..."
                    value={inputValue} 
                    onChange={handleChange}
                /><input
                    className="limitInput"
                    type="number"
                    placeholder="limit"
                    value={inputLimitValue}
                    onChange={handleLimitChange}
                />
            </div>
            <PokemonList pokemonList={sort === "name" ? [...filteredPokemonList].sort((a, b) => a.name.localeCompare(b.name)) : filteredPokemonList} />
            <div className="buttons">
                <button className="lt" onClick={handleClickLeft}>&lt;</button>
                <button className="gt" onClick={handleClickRight}>&gt;</button>
            </div>
        </div>
    )
}

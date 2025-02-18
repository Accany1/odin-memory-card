import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const MAX_POKEMON = 1025
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"

function PokemonCard({name, image}) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="name">{name}</div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [pokemon, setPokemon] = useState([])

  function randomID() {
    return Math.floor(Math.random() * MAX_POKEMON)
  }

  async function fetchPokemon() {
    let response = await fetch(POKEMON_URL + randomID())
    let data = await response.json()
    setPokemon((oldvalue) => [...oldvalue, data])
  }

  useEffect(() => {
    let mounted = true

    if (mounted) {
      for (let i = 0; i < 4; i++) {
        fetchPokemon()
      }
    }
    
    return () => {
      mounted = false
    }},[])


  

  return (
    <>
      <div>
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <div>Score: {count}</div>
          <div>Best Score: 0</div>
        </div>
        <div className="card-holder">
          {pokemon.map((p) => {return <PokemonCard key={p.id} name={p.name} image={p.sprites.front_default} />})}
        </div>
      </div>
    </>
  )
}

export default App

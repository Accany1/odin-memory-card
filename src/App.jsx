import { useEffect, useState } from 'react'
import './App.css'
import shuffleArray from './components/shuffleArray.jsx'
import PokemonCard from './components/PokemonCard.jsx'
import randomID from './components/randomID.jsx'

const MAX_POKEMON = 1025
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"

function App() {
  const [count, setCount] = useState(0)
  const [pokemon, setPokemon] = useState([])
  const [selected, setSelected] = useState([])
  const [bestScore, setBestScore] = useState(0)
 
  async function fetchPokemon() {
    let response = await fetch(POKEMON_URL + randomID(MAX_POKEMON))
    let data = await response.json()
    setPokemon((oldvalue) => [...oldvalue, data])
  }

  useEffect(() => {
    let mounted = true

    if (mounted) {
      for (let i = 0; i < 6; i++) {
        fetchPokemon()
      }
    }
    
    return () => {
      mounted = false
    }},[]
  )

  const handleClick = (name) => {
    if (selected.includes(name)) {
      setSelected([])
      if (count > bestScore) {
        setBestScore(count)
      }
      setCount(0)
      setPokemon(shuffleArray(pokemon))
    } else {
      setSelected([...selected, name])
      setCount(count + 1)
      setPokemon(shuffleArray(pokemon))
    }
  }

  return (
    <>
      <div>
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <div>Score: {count}</div>
          <div>Best Score: {bestScore}</div>
        </div>
        <div className="card-container">
          {pokemon.map((p) => {return <PokemonCard key={p.id} name={p.name} image={p.sprites.other['official-artwork'].front_default} onClick={(e) => handleClick(p.name)} />})}
        </div>
      </div>
    </>
  )
}

export default App

import { useEffect, useState, useRef } from 'react'
import './App.css'

const MAX_POKEMON = 1025
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"

function PokemonCard({name, image,onClick}) {
  return (
    <div onClick={onClick} className="card">
      <img src={image} alt={name} width={250} height={250} />
      <div className="name">{name}</div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [pokemon, setPokemon] = useState([])
  const [restart, setRestart] = useState(false)
  const [selected, setSelected] = useState([])
  const [bestScore, setBestScore] = useState(0)

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
      for (let i = 0; i < 6; i++) {
        fetchPokemon()
      }
    }
    
    return () => {
      mounted = false
    }},[]
  )

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const handleClick = (name) => {
    if (selected.includes(name)) {
      setSelected([])
      setRestart(true)
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

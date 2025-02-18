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

  function getPokemon(id) {
    fetch(POKEMON_URL + id)
      .then(res => res.json())
      .then(data => {
        setPokemon(pokemon.concat(data))
      })
  }

  function getRandomPokemon() {
    getPokemon(randomID())
  }
  

  return (
    <>
      <div>
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <div>Score: {count}</div>
          <div>Best Score: 0</div>
        </div>
        <div className="card-holder">
          <button onClick={getRandomPokemon}>Get Random Pokemon</button>
          {pokemon.map((p) => {return <PokemonCard key={p.id} name={p.name} image={p.sprites.front_default} />})}
        </div>
      </div>
    </>
  )
}

export default App

function PokemonCard({name, image,onClick}) {
  return (
    <div onClick={onClick} className="card">
      <img src={image} alt={name} width={250} height={250} />
      <div className="name">{name}</div>
    </div>
  )
}

export default PokemonCard
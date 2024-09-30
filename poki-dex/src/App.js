import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

function App() {
  const [id, setId] = useState(1); // Pokémon ID
  const [pokemon, setPokemon] = useState(null); // Pokémon data
  const [view, setView] = useState('info'); // 'info' or 'moves'

  // Fetch Pokémon data based on ID
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, [id]);

  // Handlers for next and previous buttons
  const handleNext = () => setId((prevId) => prevId + 1);
  const handlePrev = () => setId((prevId) => (prevId > 1 ? prevId - 1 : 1));

  if (!pokemon) {
    return <div>Loading...</div>; // Loading state before the Pokémon data is fetched
  }

  return (
    <div className="pokedex">
      <div className="pokemon-display">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
        <h1 className="name">{pokemon.name}</h1>
        <div className="types">
          <strong>Type:</strong> {/* Added label for types */}
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className="type"
              style={{ backgroundColor: typeColors[typeObj.type.name] }}
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>
  
        {/* Arrow navigation buttons */}
        <div className="navigation">
          <button onClick={handlePrev}>⇦</button>
          <button onClick={handleNext}>⇨</button>
        </div>
      </div>
  
      {/* New container for Info and Moves */}
      <div className="info-moves">
        {/* Buttons for Info and Moves */}
        <div className="view-buttons">
          <button
            className={view === 'info' ? 'active' : ''}
            style={{ backgroundColor: view === 'info' ? 'green' : 'gray' }}
            onClick={() => setView('info')}
          >
            Info
          </button>
          <button
            className={view === 'moves' ? 'active' : ''}
            style={{ backgroundColor: view === 'moves' ? 'green' : 'gray' }}
            onClick={() => setView('moves')}
          >
            Moves
          </button>
        </div>
  
        {/* Conditionally render Info or Moves based on the active view */}
        {view === 'info' ? (
          <div className="info">
            <div>Height: {(pokemon.height / 10).toFixed(1)} m</div>
            <div>Weight: {(pokemon.weight / 10).toFixed(1)} kg</div>
            <div>HP: {pokemon.stats[0].base_stat}</div>
            <div>Attack: {pokemon.stats[1].base_stat}</div>
            <div>Defense: {pokemon.stats[2].base_stat}</div>
            <div>Special Attack: {pokemon.stats[3].base_stat}</div>
            <div>Special Defense: {pokemon.stats[4].base_stat}</div>
            <div>Speed: {pokemon.stats[5].base_stat}</div>
          </div>
        ) : (
          <div className="moves">
            <ul>
              {pokemon.moves.map((moveObj, index) => (
                <li key={index}>{moveObj.move.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );  
  
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

// API URL
const API_URL = 'https://rickandmortyapi.com/api/character/';

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');

  // Fetch characters => currentPage or filter changes
  useEffect(() => {
    fetchCharacters();
  }, [currentPage, filter]);

  // Fetch characters from the API
  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&name=${filter}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setCharacters(data.results);
      } else {
        setCharacters([]); // no results are found 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Load More button click
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1); //load the next page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rick and Morty Characters</h1>
      </header>
      <main>
        {/* Filter input */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {/* Character list */}
        <div className="character-list">
          {/*Empty state show "No characters found" */}
          {characters.length === 0 ? (
            <p>No characters found.</p>
          ) : (
            characters.map((character) => (
              <div key={character.id} className="character-card">
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
              </div>
            ))
          )}
        </div>
        {/* Load more button */}
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </main>
    </div>
  );
}

export default App;
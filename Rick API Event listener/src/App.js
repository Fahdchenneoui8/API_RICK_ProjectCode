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

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&name=${filter}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        if (currentPage === 1) {
          setCharacters(data.results);
        } else {
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        }
      } else {
        if (currentPage === 1) {
          setCharacters([]); // no results are found 
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Event listener for scrollin more characters
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop === clientHeight) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

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
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1); // Reset page when applying filter
            }}
          />
        </div>
        {/* Character list */}
        <div className="character-list">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          ))}
        </div>
        {/* Empty state show "No characters found" */}
        {characters.length === 0 && <p>No characters found.</p>}
      </main>
    </div>
  );
}

export default App;
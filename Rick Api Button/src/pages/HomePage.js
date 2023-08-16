import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';

// API URL
const API_URL = 'https://rickandmortyapi.com/api/character/';

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, filter]);

  // Fetch characters
  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&name=${filter}`);
      const data = await response.json();
      // Update characters
      if (data.results && data.results.length > 0) {
        setCharacters(data.results);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Load more characters
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="home-page">
      <header>
        <h1>Rick and Morty Characters</h1>
      </header>
      <main>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
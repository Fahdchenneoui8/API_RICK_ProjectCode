import React, { useState, useEffect, useRef } from 'react';
import CharacterCard from '../components/CharacterCard';

// API URL
const API_URL = 'https://rickandmortyapi.com/api/character/';
const CHARACTERS_PER_PAGE = 20;

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const loaderRef = useRef(null);

  useEffect(() => {
    fetchCharacters();
  }, [filter, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);
  
    // Fetch characters
  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&name=${filter}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Load more characters Event
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCharacters([]);
    setCurrentPage(1);
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
            onChange={handleFilterChange}
          />
        </div>
        <div className="character-list">
          {characters.map((character, index) => (
            <CharacterCard key={character.id} character={character} />
          ))}
          <div className="loader" ref={loaderRef}></div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

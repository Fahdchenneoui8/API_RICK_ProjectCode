import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { useAppContextUpdate } from '../contexts/AppContext';
import './HomePage.css';
import '../components/Header.css';

/// API Url 
const API_URL = 'https://rickandmortyapi.com/api/character/';

// const  
function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const loaderRef = useRef(null);
  const { addToFavorites } = useAppContextUpdate();

  //Fetch characters from the API base on filters and pag 
  useEffect(() => {
    fetchCharacters();
  }, [filter, statusFilter, speciesFilter, currentPage]);


  // infinity scrolling (API)
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
  }, [filter, statusFilter, speciesFilter]);


  // Fetch characters from the API for using Func
  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `${API_URL}?page=${currentPage}&name=${filter}&status=${statusFilter}&species=${speciesFilter}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle intersection observer callback for infinite scrolling
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // filter input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCharacters([]);
    setCurrentPage(1);
  };

  // status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCharacters([]);
    setCurrentPage(1);
  };

  // species filter change
  const handleSpeciesFilterChange = (e) => {
    setSpeciesFilter(e.target.value);
    setCharacters([]);
    setCurrentPage(1);
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <h1 className="app-title">Rick and Morty Characters</h1>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </header>
      <main>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filter}
            onChange={handleFilterChange}
          />
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">Select Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select value={speciesFilter} onChange={handleSpeciesFilterChange}>
            <option value="">Select Species</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
          </select>
        </div>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onAddToFavorites={() => addToFavorites(character)}
            />
          ))}
          <div className="loader" ref={loaderRef}></div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import CharacterCard from '../components/CharacterCard';
import './FavoritesPage.css';


// Fav state access
function FavoritesPage() {
  const favorites = useAppContext();

  return (
    <div className="favorites-page">
      <header>
        <h1>Favorite Characters</h1>
      </header>
      <main>
        <div className="character-list">
          {favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;

import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAppContext, useAppContextUpdate } from '../contexts/AppContext';
import './CharacterCard.css';

// useAppContext and usApp..Update to access Fav states and use remv Func
function CharacterCard({ character, onAddToFavorites }) {
  const favorites = useAppContext();
  const { removeFromFavorites } = useAppContextUpdate();

  // check Char fav or not 
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <div className="character-details">
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
      </div>
      <div className="favorite-button">
        {isFavorite ? (
          <FaHeart onClick={() => removeFromFavorites(character.id)} />
        ) : (
          <FaRegHeart onClick={onAddToFavorites} />
        )}
      </div>
    </div>
  );
}

export default CharacterCard;

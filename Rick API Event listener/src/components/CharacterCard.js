// import React from 'react';
// import { Link } from 'react-router-dom';

// const CharacterCard = ({ character }) => {
//   return (
//     <div className="character-card">
//       <img src={character.image} alt={character.name} />
//       <p>{character.name}</p>
//       <Link to={`/character/${character.id}`}>View Details</Link>
//     </div>
//   );
// };

// export default CharacterCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <Link to={`/character/${character.id}`}>View Details</Link>
    </div>
  );
};

export default CharacterCard;

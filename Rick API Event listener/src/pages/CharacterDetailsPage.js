// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// // API URL
// const API_URL = 'https://rickandmortyapi.com/api/character/';

// const CharacterDetailsPage = () => {
//   const { characterId } = useParams();
//   const [character, setCharacter] = useState(null);

//   // Fetch character details 
//   useEffect(() => {
//     fetchCharacter();
//   }, [characterId]);

//   // Fetch char data frm API
//   const fetchCharacter = async () => {
//     try {
//       const response = await fetch(`${API_URL}/${characterId}`);
//       const data = await response.json();

//       if (data) {
//         setCharacter(data);
//       }
//     } catch (error) {
//       console.error('Error fetching character:', error);
//     }
//   };

//   return (
//     <div className="character-details-page">
//       <header>
//         <h1>Character Details</h1>
//       </header>
//       <main>
//         {character && (
//           <div className="character-details">
//             <img src={character.image} alt={character.name} />
//             <h2>{character.name}</h2>
//             <p>Status: {character.status}</p>
//             <p>Species: {character.species}</p>
//             <p>Origin: {character.origin.name}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CharacterDetailsPage;

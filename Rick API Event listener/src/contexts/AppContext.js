import React, { createContext, useContext, useState } from 'react';

// share state and functions without props manually 
const AppContext = createContext();
const AppContextUpdate = createContext();

//hooks 
// this for Fav list
export function useAppContext() {
  return useContext(AppContext);
}

// add / remove Fav list
export function useAppContextUpdate() {
  return useContext(AppContextUpdate);
}

//manage the list of favorite characters
export function AppContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // add and remove Fnc  
  function addToFavorites(character) {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  }

  function removeFromFavorites(characterId) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((character) => character.id !== characterId)
    );
  }

    //manage all fnc add-remove and wrap the entire app 'appCntPrv' 
  return (
    <AppContext.Provider value={favorites}>
      <AppContextUpdate.Provider
        value={{ addToFavorites, removeFromFavorites }}
      >
        {children}
      </AppContextUpdate.Provider>
    </AppContext.Provider>
  );
}

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import { AppContextProvider } from './contexts/AppContext'; 
import './App.css';

// call routes 
function App() {
  return (
    <Router>
      <div className="App">
        {/* wrap the entire app with rtes and components ==> 'appcontext' */}
        <AppContextProvider> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </AppContextProvider>
      </div>
    </Router>
  );
}

export default App;

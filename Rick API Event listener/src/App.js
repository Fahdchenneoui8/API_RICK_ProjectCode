import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:characterId" element={<CharacterDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

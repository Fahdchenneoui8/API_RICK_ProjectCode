import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


// The Header code 
const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorite Characters</Link>
      </nav>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';

interface HeaderProps {
  // Define props if needed
}

function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          Jainam Tech Real Estate
        </a>
        <button className="mobile-menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a href="#buy">Buy</a>
            </li>
            <li>
              <a href="#rent">Rent</a>
            </li>
            <li>
              <a href="#sell">Sell</a>
            </li>
            <li>
              <a href="#agents">Agents</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

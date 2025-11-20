import React, { useState } from 'react';

interface HeaderProps {
  // Add any props if needed
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">James Finance</div>
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#solutions" className="nav-link">
              Solutions
            </a>
            <a href="#resources" className="nav-link">
              Resources
            </a>
            <a href="#login" className="nav-link">
              Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

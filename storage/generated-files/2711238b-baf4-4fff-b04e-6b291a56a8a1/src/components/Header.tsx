import React, { useState } from 'react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">Apollo Tech</div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            n{' '}
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#courses" className="nav-link">
              Courses
            </a>
            <a href="#instructors" className="nav-link">
              Instructors
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#login" className="nav-link">
              Login
            </a>
            <a href="#signup" className="nav-link">
              Signup
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

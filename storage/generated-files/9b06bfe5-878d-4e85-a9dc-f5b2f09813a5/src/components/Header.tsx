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
          Hemlet Glob
        </a>
        <nav className="nav-links">
          <a href="#courses">Courses</a>
          <a href="#instructors">Instructors</a>
          <a href="#about">About</a>
          <a href="#login">Login</a>
          <a href="#signup">Signup</a>
        </nav>
        <button className="mobile-menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <button className="mobile-menu-close" onClick={toggleMenu}>
            ×
          </button>
          <a href="#courses">Courses</a>
          <a href="#instructors">Instructors</a>
          <a href="#about">About</a>
          <a href="#login">Login</a>
          <a href="#signup">Signup</a>
        </div>
      </div>
    </header>
  );
}

export default Header;

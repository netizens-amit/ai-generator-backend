import React from 'react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">Kevins Finance</div>
        <button
          className="menu-toggle"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            if (onMenuToggle) onMenuToggle();
          }}
        >
          ☰
        </button>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
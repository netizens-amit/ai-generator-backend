import React, { useState } from 'react';
interface HeaderProps {}
function Header({}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <header className="header">
      {' '}
      <div className="container">
        {' '}
        <div className="logo">Cypher Tech</div>{' '}
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          {' '}
          <ul>
            {' '}
            <li>
              <a href="#services">Services</a>
            </li>{' '}
            <li>
              <a href="#solutions">Solutions</a>
            </li>{' '}
            <li>
              <a href="#resources">Resources</a>
            </li>{' '}
            <li>
              <a href="#login">Login</a>
            </li>{' '}
          </ul>{' '}
        </nav>{' '}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>{' '}
      </div>{' '}
    </header>
  );
}
export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
interface HeaderProps {}
function Header({}: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <header className="header">
      {' '}
      <div className="container">
        {' '}
        <div className="header-content">
          {' '}
          <Link to="/" className="logo">
            Netizens
          </Link>{' '}
          <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
            {' '}
            <ul>
              {' '}
              <li>
                <Link to="/features">Features</Link>
              </li>{' '}
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>{' '}
              <li>
                <Link to="/resources">Resources</Link>
              </li>{' '}
              <li>
                <Link to="/login">Login</Link>
              </li>{' '}
              <li>
                <button className="btn">Sign Up</button>
              </li>{' '}
            </ul>{' '}
          </nav>{' '}
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>{' '}
        </div>{' '}
      </div>{' '}
    </header>
  );
}
export default Header;

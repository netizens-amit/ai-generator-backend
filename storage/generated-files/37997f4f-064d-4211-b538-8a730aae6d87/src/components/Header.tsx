import React, { useState } from 'react';
import './App.css';
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
          <div className="logo">KuberNet</div>{' '}
          <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
            {' '}
            <ul>
              {' '}
              <li>
                <a href="#">Home</a>
              </li>{' '}
              <li>
                <a href="#">Shop</a>
              </li>{' '}
              <li>
                <a href="#">About</a>
              </li>{' '}
              <li>
                <a href="#">Services</a>
              </li>{' '}
              <li>
                <a href="#">Contact</a>
              </li>{' '}
            </ul>{' '}
          </nav>{' '}
          <div className="header-actions">
            {' '}
            <input type="text" placeholder="Search..." /> <div className="cart-icon">Cart (0)</div>{' '}
            <div className="user-menu">User</div>{' '}
          </div>{' '}
          <div className="menu-toggle" onClick={toggleMenu}>
            {' '}
            <span></span> <span></span> <span></span>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </header>
  );
}
export default Header;

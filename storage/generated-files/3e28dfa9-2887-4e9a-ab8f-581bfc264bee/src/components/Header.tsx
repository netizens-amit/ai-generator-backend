import React, { useState } from 'react';
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <header className="header">
      {' '}
      <nav className="header__nav">
        {' '}
        <div className="header__logo">LiveCode</div>{' '}
        <ul className="header__menu">
          {' '}
          <li>
            <a href="#features">Features</a>
          </li>{' '}
          <li>
            <a href="#about">About</a>
          </li>{' '}
          <li>
            <a href="#services">Services</a>
          </li>{' '}
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>{' '}
          <li>
            <a href="#contact">Contact</a>
          </li>{' '}
        </ul>{' '}
        <div className="header__cta">
          {' '}
          <button>Start Free Trial</button> <button>Watch Demo</button>{' '}
        </div>{' '}
        <div className="mobile-menu">
          {' '}
          <button onClick={toggleMobileMenu} className="mobile-menu__toggle">
            ☰
          </button>{' '}
          <ul className="mobile-menu__menu" style={{ display: mobileMenuOpen ? 'flex' : 'none' }}>
            {' '}
            <li>
              <a href="#features">Features</a>
            </li>{' '}
            <li>
              <a href="#about">About</a>
            </li>{' '}
            <li>
              <a href="#services">Services</a>
            </li>{' '}
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>{' '}
            <li>
              <a href="#contact">Contact</a>
            </li>{' '}
          </ul>{' '}
        </div>{' '}
      </nav>{' '}
    </header>
  );
}
export default Header;

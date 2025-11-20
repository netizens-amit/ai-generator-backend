import React, { useState } from 'react';

interface HeaderProps {
  // Define props if needed
}

function Header({}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          CubeFinance
        </a>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </ul>
        </nav>
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu open">
          <button className="close-button" onClick={toggleMobileMenu}>
            ×
          </button>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#services" onClick={toggleMobileMenu}>
                  Services
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={toggleMobileMenu}>
                  Solutions
                </a>
              </li>
              <li>
                <a href="#resources" onClick={toggleMobileMenu}>
                  Resources
                </a>
              </li>
              <li>
                <a href="#login" onClick={toggleMobileMenu}>
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

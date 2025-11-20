import React from 'react';
import './App.css';
interface FooterProps {}
function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      {' '}
      <div className="container">
        {' '}
        <div className="footer-links">
          {' '}
          <div className="footer-section">
            {' '}
            <h3>About Us</h3>{' '}
            <ul>
              {' '}
              <li>
                <a href="#">Our Story</a>
              </li>{' '}
              <li>
                <a href="#">Our Services</a>
              </li>{' '}
              <li>
                <a href="#">Contact Us</a>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-section">
            {' '}
            <h3>Help</h3>{' '}
            <ul>
              {' '}
              <li>
                <a href="#">FAQ</a>
              </li>{' '}
              <li>
                <a href="#">Shipping</a>
              </li>{' '}
              <li>
                <a href="#">Returns</a>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-section">
            {' '}
            <h3>Follow Us</h3>{' '}
            <ul>
              {' '}
              <li>
                <a href="#">Facebook</a>
              </li>{' '}
              <li>
                <a href="#">Twitter</a>
              </li>{' '}
              <li>
                <a href="#">Instagram</a>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
        </div>{' '}
        <div className="footer-bottom">
          {' '}
          <p>&copy; 2023 KuberNet. All rights reserved.</p>{' '}
        </div>{' '}
      </div>{' '}
    </footer>
  );
}
export default Footer;

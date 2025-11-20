import React from 'react';
import { Link } from 'react-router-dom';
interface FooterProps {}
function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      {' '}
      <div className="container">
        {' '}
        <div className="footer-content">
          {' '}
          <div className="footer-section">
            {' '}
            <h4>About Us</h4>{' '}
            <p>
              Netizens Technology is a leading provider of innovative technology solutions for
              businesses.
            </p>{' '}
          </div>{' '}
          <div className="footer-section">
            {' '}
            <h4>Resources</h4>{' '}
            <ul>
              {' '}
              <li>
                <Link to="/documentation">Documentation</Link>
              </li>{' '}
              <li>
                <Link to="/faq">FAQ</Link>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-section">
            {' '}
            <h4>Support</h4>{' '}
            <ul>
              {' '}
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>{' '}
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className="footer-section">
            {' '}
            <h4>Follow Us</h4>{' '}
            <ul>
              {' '}
              <li>
                <a href="#">Facebook</a>
              </li>{' '}
              <li>
                <a href="#">Twitter</a>
              </li>{' '}
              <li>
                <a href="#">LinkedIn</a>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </footer>
  );
}
export default Footer;

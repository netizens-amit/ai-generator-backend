import React from 'react';

interface FooterProps {
  // Add any props if needed
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="#terms" className="footer-link">
            Terms of Service
          </a>
          <a href="#privacy" className="footer-link">
            Privacy Policy
          </a>
          <a href="#security" className="footer-link">
            Security
          </a>
        </div>
        <div className="footer-copyright">&copy; 2023 James Finance. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;

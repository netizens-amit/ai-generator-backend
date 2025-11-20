import React from 'react';

interface FooterProps {
  // Define props if needed
}

function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2023 Jainam Tech Real Estate. All rights reserved.</p>
        <div className="social-links">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

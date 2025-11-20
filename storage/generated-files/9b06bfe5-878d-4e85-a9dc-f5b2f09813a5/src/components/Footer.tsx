import React from 'react';

interface FooterProps {
  // Define props if needed
}

function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Hemlet Glob. All rights reserved.</p>
        <div className="footer-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

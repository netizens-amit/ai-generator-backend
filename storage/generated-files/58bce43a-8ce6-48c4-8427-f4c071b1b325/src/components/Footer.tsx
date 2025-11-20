import React from 'react';

interface FooterProps {
  // Define props if needed
}

function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2023 CubeFinance. All rights reserved. | SEC Registered | BBB A+ Rating</p>
        <p>
          Disclaimer: Investing involves risk. Your deposits are insured up to $250,000. No hidden
          fees. Clear terms.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

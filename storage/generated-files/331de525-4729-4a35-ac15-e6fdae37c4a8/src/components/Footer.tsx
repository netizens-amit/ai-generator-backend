import React from 'react';
interface FooterProps {}
function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      {' '}
      <div className="container">
        {' '}
        <div className="footer-links">
          {' '}
          <ul>
            {' '}
            <li>
              <a href="#services">Services</a>
            </li>{' '}
            <li>
              <a href="#solutions">Solutions</a>
            </li>{' '}
            <li>
              <a href="#resources">Resources</a>
            </li>{' '}
            <li>
              <a href="#login">Login</a>
            </li>{' '}
          </ul>{' '}
          <div className="social">
            {' '}
            <a href="#">Facebook</a> <a href="#">Twitter</a> <a href="#">LinkedIn</a>{' '}
          </div>{' '}
        </div>{' '}
        <p className="disclaimer">
          Cypher Tech is a registered financial service provider. Please review our terms and
          conditions and privacy policy. © 2023 Cypher Tech.
        </p>{' '}
      </div>{' '}
    </footer>
  );
}
export default Footer;

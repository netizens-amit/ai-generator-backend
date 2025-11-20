import React from 'react';

interface HeroProps {
  // Add any props if needed
}

function Hero() {
  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Secure Your Financial Future with James Finance</h1>
          <p className="hero-description">
            We provide comprehensive financial services tailored to your needs. Open an account
            today and start building your wealth.
          </p>
          <a href="#open-account" className="btn">
            Open Account
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

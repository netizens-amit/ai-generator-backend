import React from 'react';

interface HeroProps {
  // Define props if needed
}

function Hero({}: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Secure Your Financial Future with CubeFinance</h1>
          <p>
            Empowering you with innovative financial solutions and expert guidance to achieve your
            goals.
          </p>
          <a href="#open-account" className="button">
            Open Account
          </a>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Financial Planning"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

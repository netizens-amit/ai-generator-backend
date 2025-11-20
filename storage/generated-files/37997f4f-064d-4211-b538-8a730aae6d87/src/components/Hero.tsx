import React from 'react';
import './App.css';
interface HeroProps {}
function Hero({}: HeroProps) {
  return (
    <section className="hero" id="hero">
      {' '}
      <div className="container">
        {' '}
        <div className="hero-content">
          {' '}
          <h1>Discover the Future of E-Commerce</h1>{' '}
          <p>Experience the best in class shopping with KuberNet.</p> <button>Shop Now</button>{' '}
        </div>{' '}
        <div className="hero-image">
          {' '}
          <img src="https://via.placeholder.com/400x500" alt="Hero" />{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Hero;

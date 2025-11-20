import React from 'react';

interface HeroProps {
  // Define props if needed
}

function Hero({}: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>
            Discover the perfect property with Jainam Tech. We offer a wide range of homes,
            apartments, and commercial spaces to suit your needs.
          </p>
          <div className="search-bar">
            <input type="text" placeholder="Location" />
            <select>
              <option value="">Price Range</option>
              <option value="50000-100000">$50,000 - $100,000</option>
              <option value="100000-200000">$100,000 - $200,000</option>
              <option value="200000-300000">$200,000 - $300,000</option>
            </select>
            <select>
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
            <button className="btn">Search</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/800x600" alt="Modern house" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

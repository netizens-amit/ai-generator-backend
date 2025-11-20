import React from 'react';

interface HeroProps {
  // Define props if needed
}

function Hero({}: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <h1>Unlock Your Potential with Expert Education</h1>
        <p>
          Join Hemlet Glob and explore a wide range of courses designed to help you achieve your
          goals.
        </p>
        <a href="#courses" className="btn">
          View Courses
        </a>
      </div>
    </section>
  );
}

export default Hero;

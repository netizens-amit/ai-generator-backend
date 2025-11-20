import React from 'react';
interface HeroProps {}
function Hero({}: HeroProps) {
  return (
    <section className="hero">
      {' '}
      <div className="container">
        {' '}
        <h1>Your Financial Future Starts Here</h1>{' '}
        <p>Experience seamless banking, investments, loans, and insurance with Cypher Tech.</p>{' '}
        <button>Open Account</button>{' '}
      </div>{' '}
    </section>
  );
}
export default Hero;

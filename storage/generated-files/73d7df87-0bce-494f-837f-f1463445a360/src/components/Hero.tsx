import React from 'react';
interface HeroProps {
  onOpenAccountClick: () => void;
}

function Hero({ onOpenAccountClick }: HeroProps) {
  return (
    <section className="hero" id="home">
      <h1>Manage Your Financial Future</h1>
      <p>Effortlessly manage your finances with Kevins Finance.</p>
      <button className="cta-button" onClick={onOpenAccountClick}>Open Account</button>
    </section>
  );
}

export default Hero;
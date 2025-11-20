import React from 'react';
interface HeroProps {}
function Hero({}: HeroProps) {
  return (
    <section className="hero">
      {' '}
      <div className="container">
        {' '}
        <div className="hero-content">
          {' '}
          <h1>Transform Your Technology with Netizens</h1>{' '}
          <p>
            Unlock the full potential of your business with our cutting-edge technology solutions.
          </p>{' '}
          <button className="btn">Start Free Trial</button>{' '}
        </div>{' '}
        <div className="hero-video">
          {' '}
          <video src="https://via.placeholder.com/1200x800" controls></video>{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Hero;

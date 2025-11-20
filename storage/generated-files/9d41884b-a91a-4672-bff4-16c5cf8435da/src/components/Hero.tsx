import React from 'react';

function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="container">
        <h1 className="section-title">Powering the Future of Tech with Jems Tech</h1>
        <p className="hero-description">
          Next-generation SaaS solutions that deliver real results for your business
        </p>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Jems Tech Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button className="cta-button">Start Free Trial</button>
      </div>
    </section>
  );
}

export default Hero;

import React from 'react';

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Video Lessons</h3>
            <p>
              Watch engaging and informative video lessons designed to enhance your learning
              experience.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Interactive Quizzes</h3>
            <p>Test your knowledge with interactive quizzes to reinforce learning.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Certificates</h3>
            <p>Earn certificates upon course completion to showcase your achievements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

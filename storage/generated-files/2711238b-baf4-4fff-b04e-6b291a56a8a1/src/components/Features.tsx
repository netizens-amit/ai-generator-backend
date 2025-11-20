import React from 'react';

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Comprehensive Curriculum</h3>
            <p>Access a wide range of courses tailored to your needs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Community Support</h3>
            <p>Engage with a community of learners and share knowledge.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

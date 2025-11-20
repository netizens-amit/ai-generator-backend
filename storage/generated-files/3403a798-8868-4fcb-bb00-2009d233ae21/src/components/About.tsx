import React from 'react';

interface AboutProps {
  // Add any props if needed
}

function About() {
  return (
    <section className="about section">
      <div className="container">
        <h2 className="section-title">About James Finance</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="https://via.placeholder.com/500x300" alt="About James Finance" />
          </div>
          <div className="about-description">
            <p>
              James Finance is a leading financial services company dedicated to providing
              innovative solutions and exceptional customer service. With years of experience in the
              industry, we are committed to helping our clients achieve their financial goals.
            </p>
            <p>
              Our team of experts offers a wide range of services, including banking, investments,
              loans, and insurance. We pride ourselves on our integrity, transparency, and
              commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

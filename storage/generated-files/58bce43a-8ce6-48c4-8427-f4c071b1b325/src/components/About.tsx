import React from 'react';

interface AboutProps {
  // Define props if needed
}

function About({}: AboutProps) {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1560250097-0c935e73fcb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Company Story"
          />
        </div>
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            At CubeFinance, we believe in empowering individuals and businesses with the financial
            tools and knowledge they need to succeed. Founded in 2010, we have been committed to
            providing innovative solutions and exceptional service.
          </p>
          <p>
            Our values are built on trust, transparency, and a client-centric approach. We are
            dedicated to helping you achieve your financial goals with integrity and expertise.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

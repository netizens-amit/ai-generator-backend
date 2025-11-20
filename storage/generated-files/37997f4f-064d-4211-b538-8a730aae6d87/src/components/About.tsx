import React from 'react';
import './App.css';
interface AboutProps {}
function About({}: AboutProps) {
  return (
    <section className="about" id="about">
      {' '}
      <div className="container">
        {' '}
        <div className="about-content">
          {' '}
          <h2>Our Story</h2>{' '}
          <p>
            KuberNet was founded with the vision to provide an unparalleled shopping experience.
          </p>{' '}
          <h3>Our Values</h3>{' '}
          <ul>
            {' '}
            <li>Customer Satisfaction</li> <li>Quality Products</li> <li>Reliability</li>{' '}
          </ul>{' '}
        </div>{' '}
        <div className="about-image">
          {' '}
          <img src="https://via.placeholder.com/400x500" alt="About" />{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default About;

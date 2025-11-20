import React from 'react';
interface AboutProps {}
function About({}: AboutProps) {
  return (
    <section className="about">
      {' '}
      <div className="container">
        {' '}
        <h2>About Us</h2>{' '}
        <p>
          Cypher Tech is dedicated to providing innovative financial solutions to individuals and
          businesses worldwide. We are committed to transparency, security, and customer
          satisfaction.
        </p>{' '}
        <h3>Our Values</h3>{' '}
        <ul>
          {' '}
          <li>Security: Bank-Level Encryption, FDIC Insured</li>{' '}
          <li>Trust: BBB A+ Rating, SEC Registered</li>{' '}
          <li>Transparency: No hidden fees, clear terms</li>{' '}
        </ul>{' '}
      </div>{' '}
    </section>
  );
}
export default About;

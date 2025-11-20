import React from 'react';
interface ServicesProps {}
function Services({}: ServicesProps) {
  return (
    <section className="services">
      {' '}
      <div className="container">
        {' '}
        <h2>Why Choose Cypher Tech?</h2>{' '}
        <p>Experience the difference with our advanced financial services.</p>{' '}
        <div className="items-grid">
          {' '}
          <div className="item-card">
            {' '}
            <h3>Security & Compliance</h3> <p>Bank-Level Encryption, FDIC Insured</p>{' '}
          </div>{' '}
          <div className="item-card">
            {' '}
            <h3>Certifications</h3> <p>SEC Registered, BBB A+ Rating</p>{' '}
          </div>{' '}
          <div className="item-card">
            {' '}
            <h3>Customer Protection</h3> <p>Your deposits are insured up to $250,000</p>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Services;

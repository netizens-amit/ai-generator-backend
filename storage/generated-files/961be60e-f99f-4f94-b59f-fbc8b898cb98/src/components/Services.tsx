import React from 'react';

interface ServicesProps {
  // Define props if needed
}

function Services({}: ServicesProps) {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Property Sales</h3>
            <p>
              We offer comprehensive sales services to help you sell your property quickly and
              efficiently.
            </p>
          </div>
          <div className="service-card">
            <h3>Property Rentals</h3>
            <p>Find the perfect rental property with our extensive listings and expert guidance.</p>
          </div>
          <div className="service-card">
            <h3>Property Management</h3>
            <p>
              We provide professional property management services to maximize your investment
              returns.
            </p>
          </div>
          <div className="service-card">
            <h3>Investment Consulting</h3>
            <p>Get expert advice on real estate investments to grow your portfolio.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

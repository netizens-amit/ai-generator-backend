import React from 'react';

interface FeaturesProps {
  // Define props if needed
}

function Features({}: FeaturesProps) {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Wide Range of Properties</h3>
            <p>
              Explore a diverse selection of homes, apartments, and commercial spaces to find the
              perfect fit.
            </p>
          </div>
          <div className="feature-card">
            <h3>Expert Agents</h3>
            <p>
              Our experienced agents are dedicated to helping you navigate the real estate market
              with confidence.
            </p>
          </div>
          <div className="feature-card">
            <h3>Advanced Search Tools</h3>
            <p>
              Utilize our powerful search filters to narrow down your options and find exactly what
              you're looking for.
            </p>
          </div>
          <div className="feature-card">
            <h3>Mortgage Calculator</h3>
            <p>
              Estimate your monthly payments and explore different financing options with our
              easy-to-use mortgage calculator.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

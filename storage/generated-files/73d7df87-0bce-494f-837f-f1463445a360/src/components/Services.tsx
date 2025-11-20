import React from 'react';
interface Service {
  title: string;
  description: string;
  icon: string;
}

function Services() {
  const services: Service[] = [
    { title: 'Banking', description: 'Secure and convenient banking services.', icon: '🏦' },
    { title: 'Investments', description: 'Grow your wealth with investment solutions.', icon: '📈' },
    { title: 'Loans', description: 'Access loans for various needs.', icon: '🏠' },
    { title: 'Insurance', description: 'Protect your assets with insurance.', icon: '🛡️' }
  ];

  return (
    <section className="services" id="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <span className="service-icon" style={{ fontSize: '2rem' }}>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
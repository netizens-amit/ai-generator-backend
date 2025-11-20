import React from 'react';

interface Service {
  title: string;
  description: string;
}

function Services() {
  const services: Service[] = [
    {
      title: 'Custom Development',
      description: 'Tailored software solutions for your specific needs.',
    },
    {
      title: 'Cloud Solutions',
      description: 'Leverage the power of cloud computing for your business.',
    },
    {
      title: 'Data Analytics',
      description: 'Gain insights from your data to make informed decisions.',
    },
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <svg className="service-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2L2 22h20L12 2z" />
              </svg>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

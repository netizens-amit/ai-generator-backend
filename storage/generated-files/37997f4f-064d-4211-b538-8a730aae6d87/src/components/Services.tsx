import React from 'react';
import './App.css';
interface Service {
  title: string;
  description: string;
  icon: string;
}
interface ServicesProps {}
function Services({}: ServicesProps) {
  const services: Service[] = [
    {
      title: 'Wide Range of Products',
      description: 'Browse through thousands of products in various categories.',
      icon: 'shop',
    },
    {
      title: 'Easy Returns',
      description: 'Enjoy hassle-free returns within 30 days.',
      icon: 'return',
    },
    {
      title: 'Secure Checkout',
      description: 'Your payments are processed securely on our platform.',
      icon: 'secure',
    },
  ];
  return (
    <section className="services" id="services">
      {' '}
      <div className="container">
        {' '}
        <h2>Our Services</h2>{' '}
        <div className="services-grid">
          {' '}
          {services.map((service, index) => (
            <div key={index} className="service-card">
              {' '}
              <div className="service-icon">{service.icon}</div> <h3>{service.title}</h3>{' '}
              <p>{service.description}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Services;

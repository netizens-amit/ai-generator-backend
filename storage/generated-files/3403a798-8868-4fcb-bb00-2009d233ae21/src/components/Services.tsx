import React from 'react';
import { FaUniversity, FaChartLine, FaMoneyBill, FaHouseDamage } from 'react-icons/fa';

interface Service {
  icon: React.ComponentType;
  title: string;
  description: string;
}

interface ServicesProps {
  // Add any props if needed
}

function Services() {
  const services: Service[] = [
    {
      icon: FaUniversity,
      title: 'Banking',
      description: 'Comprehensive banking solutions for your personal and business needs.',
    },
    {
      icon: FaChartLine,
      title: 'Investments',
      description: 'Expert investment advice to grow your wealth and achieve financial security.',
    },
    {
      icon: FaMoneyBill,
      title: 'Loans',
      description: 'Competitive loan options to help you finance your dreams and goals.',
    },
    {
      icon: FaHouseDamage,
      title: 'Insurance',
      description: 'Protect yourself and your assets with our comprehensive insurance plans.',
    },
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <service.icon className="service-icon" />
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

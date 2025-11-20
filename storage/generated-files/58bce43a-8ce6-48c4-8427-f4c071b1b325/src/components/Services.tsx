import React from 'react';

interface ServicesProps {
  // Define props if needed
}

function Services({}: ServicesProps) {
  const servicesData = [
    {
      id: 1,
      icon: '🏦',
      title: 'Personal Banking',
      description:
        'Manage your finances with ease using our secure and convenient online and mobile banking services.',
    },
    {
      id: 2,
      icon: '💼',
      title: 'Business Banking',
      description:
        'Tailored banking solutions to support your business growth and streamline your operations.',
    },
    {
      id: 3,
      icon: '📈',
      title: 'Investment Services',
      description:
        'Grow your wealth with our expert investment guidance and a wide range of investment options.',
    },
    {
      id: 4,
      icon: '🛡️',
      title: 'Insurance Solutions',
      description:
        'Protect yourself and your assets with our comprehensive insurance coverage options.',
    },
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;

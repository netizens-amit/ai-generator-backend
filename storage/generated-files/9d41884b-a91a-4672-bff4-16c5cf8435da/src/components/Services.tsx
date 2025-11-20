import React from 'react';

interface Service {
  title: string;
  description: string;
}

function Services() {
  const services: Service[] = [
    {
      title: 'Cloud Migration',
      description:
        'Seamless transition of your data and applications to the cloud with our expert guidance and tools.',
    },
    {
      title: 'Data Analytics',
      description:
        'Transform raw data into actionable insights with our powerful analytics platform.',
    },
    {
      title: 'Security Solutions',
      description: 'Advanced security measures to protect your data and systems from threats.',
    },
    {
      title: 'Custom Development',
      description: 'Tailored software solutions designed specifically for your business needs.',
    },
    {
      title: 'API Integration',
      description:
        'Effortless integration with third-party tools and platforms to enhance functionality.',
    },
    {
      title: 'Support & Maintenance',
      description: 'Ongoing support and maintenance to keep your systems running smoothly.',
    },
  ];

  return (
    <section className="services section" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="service-list">
          {services.map((service, index) => (
            <div key={index} className="service-card">
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

import React from 'react';
interface ServicesProps {}
function Services({}: ServicesProps) {
  const services = [
    { title: 'Service 1', description: 'Description of Service 1' },
    { title: 'Service 2', description: 'Description of Service 2' },
    { title: 'Service 3', description: 'Description of Service 3' },
  ];
  return (
    <section className="services">
      {' '}
      <div className="container">
        {' '}
        <h2>Our Services</h2>{' '}
        <div className="grid grid-3">
          {' '}
          {services.map((service, index) => (
            <div key={index} className="service-card">
              {' '}
              <h3>{service.title}</h3> <p>{service.description}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Services;

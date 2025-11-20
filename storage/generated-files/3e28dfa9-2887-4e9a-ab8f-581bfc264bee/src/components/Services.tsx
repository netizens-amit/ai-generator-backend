import React from 'react';
function Services() {
  const serviceItems = [
    {
      id: 1,
      title: 'Code Development',
      description:
        'Create and manage your codebases with our powerful integrated development environment',
    },
    {
      id: 2,
      title: 'Testing & Debugging',
      description: 'Test your applications with our built-in testing tools and debugging suite',
    },
    {
      id: 3,
      title: 'Deployment Solutions',
      description: 'Deploy your applications to the cloud with our seamless deployment tools',
    },
    {
      id: 4,
      title: 'API Integration',
      description: 'Connect your applications with our powerful API suite and documentation',
    },
    {
      id: 5,
      title: 'Security Compliance',
      description:
        'Ensure your applications are secure with our SOC 2 certified platform and GDPR compliance',
    },
    {
      id: 6,
      title: 'Performance Monitoring',
      description: 'Monitor your application performance with our advanced analytics tools',
    },
  ];
  return (
    <section className="services">
      {' '}
      <div className="container">
        {' '}
        <h2 className="services__title">Our Services</h2>{' '}
        <div className="services__cards">
          {' '}
          {serviceItems.map((item) => (
            <div key={item.id} className="services__card">
              {' '}
              <h3 className="services__card__title">{item.title}</h3>{' '}
              <p className="services__card__description">{item.description}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Services;

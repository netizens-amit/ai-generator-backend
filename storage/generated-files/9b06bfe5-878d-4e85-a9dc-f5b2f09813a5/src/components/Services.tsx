import React from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
}

interface ServicesProps {
  // Define props if needed
}

function Services({}: ServicesProps) {
  const servicesData: Service[] = [
    {
      id: 1,
      title: 'Online Courses',
      description: 'Access a vast library of courses on various topics.',
    },
    {
      id: 2,
      title: 'Expert Instructors',
      description: 'Learn from industry experts with years of experience.',
    },
    {
      id: 3,
      title: 'Personalized Learning',
      description: 'Tailor your learning experience to your individual needs.',
    },
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;

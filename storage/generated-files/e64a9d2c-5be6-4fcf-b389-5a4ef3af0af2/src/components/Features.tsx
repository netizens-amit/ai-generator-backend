import React from 'react';

interface Feature {
  title: string;
  description: string;
}

function Features() {
  const features: Feature[] = [
    {
      title: 'Scalable Solutions',
      description: 'Build scalable applications that grow with your business.',
    },
    {
      title: 'Robust Security',
      description: 'Enjoy peace of mind with industry-leading security measures.',
    },
    {
      title: 'User-Friendly',
      description: 'Create intuitive user experiences that keep users coming back.',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2L2 22h20L12 2z" />
              </svg>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

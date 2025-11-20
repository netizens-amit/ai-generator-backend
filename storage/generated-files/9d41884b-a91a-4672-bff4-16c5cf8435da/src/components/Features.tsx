import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

function Features() {
  const features: Feature[] = [
    {
      title: 'AI-Driven Analytics',
      description: 'Leverage cutting-edge AI to gain deep insights from your data.',
      icon: '',
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Work seamlessly with your team across multiple platforms.',
      icon: '',
    },
    {
      title: 'Cloud Security',
      description: 'Top-tier security protocols to protect your data at all times.',
      icon: '',
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Grow your business with our flexible and scalable cloud solutions.',
      icon: '',
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with your existing systems and tools.',
      icon: '',
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated support team is always there to help you.',
      icon: '',
    },
  ];

  return (
    <section className="features section" id="features">
      <div className="container">
        <h2 className="section-title">Key Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
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

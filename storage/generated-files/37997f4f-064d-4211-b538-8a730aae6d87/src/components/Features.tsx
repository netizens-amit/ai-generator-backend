import React from 'react';
import './App.css';
interface Feature {
  title: string;
  description: string;
  icon: string;
}
interface FeaturesProps {}
function Features({}: FeaturesProps) {
  const features: Feature[] = [
    {
      title: 'Fast Delivery',
      description: 'Get your orders quickly with our fast delivery service.',
      icon: 'truck',
    },
    {
      title: 'Secure Payments',
      description: 'Enjoy secure and encrypted payments for your online shopping.',
      icon: 'lock',
    },
    {
      title: '24/7 Support',
      description: 'Our customer support team is available 24/7 to assist you.',
      icon: 'phone',
    },
  ];
  return (
    <section className="features" id="features">
      {' '}
      <div className="container">
        {' '}
        <h2>Why Choose Us?</h2>{' '}
        <div className="features-grid">
          {' '}
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {' '}
              <div className="feature-icon">{feature.icon}</div> <h3>{feature.title}</h3>{' '}
              <p>{feature.description}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Features;

import React from 'react';
import { FaLock, FaShieldAlt, FaKey } from 'react-icons/fa';

interface Feature {
  icon: React.ComponentType;
  title: string;
  description: string;
}

interface FeaturesProps {
  // Add any props if needed
}

function Features() {
  const features: Feature[] = [
    {
      icon: FaLock,
      title: 'Secure Banking',
      description: 'Advanced security measures to protect your funds and personal information.',
    },
    {
      icon: FaShieldAlt,
      title: 'Compliance',
      description: 'We adhere to the highest regulatory standards to ensure your peace of mind.',
    },
    {
      icon: FaKey,
      title: 'Privacy',
      description: 'Your privacy is our priority. We are committed to protecting your data.',
    },
  ];

  return (
    <section className="features section">
      <div className="container">
        <h2 className="section-title">Security and Compliance</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <feature.icon className="feature-icon" />
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

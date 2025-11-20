import React from 'react';

interface FeaturesProps {
  // Define props if needed
}

function Features({}: FeaturesProps) {
  const featuresData = [
    {
      id: 1,
      icon: '🏦',
      title: 'Banking',
      description:
        'Secure and convenient banking solutions for your everyday needs. Your deposits are insured up to $250,000.',
    },
    {
      id: 2,
      icon: '📈',
      title: 'Investments',
      description:
        'Expert investment strategies to grow your wealth and achieve financial independence. SEC Registered.',
    },
    {
      id: 3,
      icon: '💰',
      title: 'Loans',
      description:
        'Competitive loan options with clear terms and no hidden fees. $XXX monthly payment.',
    },
    {
      id: 4,
      icon: '🛡️',
      title: 'Insurance',
      description:
        'Comprehensive insurance plans to protect what matters most. Client testimonials with metrics.',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        {featuresData.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;

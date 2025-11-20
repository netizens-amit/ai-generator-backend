import React from 'react';
interface FeaturesProps {}
function Features({}: FeaturesProps) {
  const features = [
    { icon: '💰', title: 'Banking', description: 'Safe and secure online banking services.' },
    {
      icon: '📊',
      title: 'Investments',
      description: 'Grow your wealth with expert investment management.',
    },
    {
      icon: '🏠',
      title: 'Loans',
      description: 'Access to competitive loan options for all needs.',
    },
    {
      icon: '🛡️',
      title: 'Insurance',
      description: 'Protect your assets with comprehensive insurance solutions.',
    },
  ];
  return (
    <section className="features">
      {' '}
      <div className="container">
        {' '}
        <h2>Our Services</h2>{' '}
        <div className="items-grid">
          {' '}
          {features.map((feature, index) => (
            <div key={index} className="item-card">
              {' '}
              <div className="icon">{feature.icon}</div> <h3>{feature.title}</h3>{' '}
              <p>{feature.description}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Features;

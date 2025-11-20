import React from 'react';
interface FeaturesProps {}
function Features({}: FeaturesProps) {
  const features = [
    { icon: 'assets/icon1.png', title: 'Feature 1', description: 'Description of Feature 1' },
    { icon: 'assets/icon2.png', title: 'Feature 2', description: 'Description of Feature 2' },
    { icon: 'assets/icon3.png', title: 'Feature 3', description: 'Description of Feature 3' },
  ];
  return (
    <section className="features">
      {' '}
      <div className="container">
        {' '}
        <h2>Key Features</h2>{' '}
        <div className="grid grid-3">
          {' '}
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {' '}
              <img src={feature.icon} alt={feature.title} />{' '}
              <div className="feature-card-content">
                {' '}
                <h3>{feature.title}</h3> <p>{feature.description}</p>{' '}
              </div>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Features;

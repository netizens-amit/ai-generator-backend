import React from 'react';
function Features() {
  const featureItems = [
    {
      id: 1,
      title: 'Real-Time Collaboration',
      description: 'Work with your team on the same codebase in real time with LiveCode',
    },
    {
      id: 2,
      title: 'AI-Powered Code Suggestions',
      description: 'Get smart code suggestions from our AI assistant to improve your productivity',
    },
    {
      id: 3,
      title: 'Integrated Testing Tools',
      description: 'Test your applications within the platform with our built-in testing suite',
    },
    {
      id: 4,
      title: 'Cloud Deployment',
      description: 'Deploy your applications to the cloud with a single click',
    },
    {
      id: 5,
      title: 'Advanced Security',
      description: 'Stay secure with our SOC 2 certified platform and GDPR compliance',
    },
    {
      id: 6,
      title: 'API Integration',
      description: 'Connect your applications with our powerful API suite',
    },
  ];
  return (
    <section className="features">
      {' '}
      <div className="container">
        {' '}
        {featureItems.map((item) => (
          <div key={item.id} className="features__card">
            {' '}
            <div className="features__icon">💡</div>{' '}
            <h3 className="features__title">{item.title}</h3>{' '}
            <p className="features__description">{item.description}</p>{' '}
          </div>
        ))}{' '}
      </div>{' '}
    </section>
  );
}
export default Features;

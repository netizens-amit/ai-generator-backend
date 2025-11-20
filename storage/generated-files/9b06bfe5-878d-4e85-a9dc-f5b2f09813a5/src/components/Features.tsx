import React from 'react';

interface Feature {
  id: number;
  title: string;
  description: string;
}

interface FeaturesProps {
  // Define props if needed
}

function Features({}: FeaturesProps) {
  const featuresData: Feature[] = [
    {
      id: 1,
      title: 'Expert Instructors',
      description: 'Learn from experienced professionals with a passion for teaching.',
    },
    {
      id: 2,
      title: 'Flexible Learning',
      description: 'Study at your own pace with our online courses, available 24/7.',
    },
    {
      id: 3,
      title: 'Comprehensive Curriculum',
      description:
        'Gain in-depth knowledge and practical skills through our well-structured courses.',
    },
    {
      id: 4,
      title: 'Career Advancement',
      description:
        'Enhance your career prospects with our industry-relevant courses and certifications.',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        {featuresData.map((feature) => (
          <div key={feature.id} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;

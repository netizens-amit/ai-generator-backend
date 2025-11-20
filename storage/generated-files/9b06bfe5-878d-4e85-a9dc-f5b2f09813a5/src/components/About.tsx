import React from 'react';

interface AboutProps {
  // Define props if needed
}

function About({}: AboutProps) {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-image">
          <img src="https://via.placeholder.com/600x400" alt="About Hemlet Glob" />
        </div>
        <div className="about-content">
          <h2>About Hemlet Glob</h2>
          <p>
            Hemlet Glob is a leading provider of online education, committed to empowering
            individuals with the knowledge and skills they need to succeed in today's rapidly
            changing world. We offer a wide range of courses across various disciplines, taught by
            expert instructors with real-world experience.
          </p>
          <p>
            Our mission is to make quality education accessible to everyone, regardless of their
            location or background. We believe that education is the key to unlocking potential and
            creating a brighter future for individuals and communities.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

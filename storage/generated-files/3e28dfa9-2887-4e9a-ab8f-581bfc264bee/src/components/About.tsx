import React from 'react';
function About() {
  return (
    <section className="about">
      {' '}
      <div className="container">
        {' '}
        <h2 className="about__title">About LiveCode</h2>{' '}
        <div className="about__content">
          {' '}
          <p className="about__paragraph">
            LiveCode is a cutting-edge technology SaaS platform that empowers developers to create,
            test, and deploy applications with unprecedented speed and efficiency. Our mission is to
            help developers build better software faster through our innovative tools and
            collaborative environment.
          </p>{' '}
          <p className="about__paragraph">
            We are committed to excellence, security, and continuous innovation. Our team of expert
            developers and engineers work tirelessly to ensure our platform remains the best in the
            industry for developers worldwide.
          </p>{' '}
          <p className="about__paragraph">
            LiveCode is trusted by 500+ companies and has 10,000+ active users. With 99.9% uptime
            and 50M+ API calls processed each month, you can rely on our platform for your
            development needs.
          </p>{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default About;

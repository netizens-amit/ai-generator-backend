import React from 'react';

interface AboutProps {
  // Define props if needed
}

function About({}: AboutProps) {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <h2>About Jainam Tech</h2>
          <p>
            Jainam Tech is a leading real estate company committed to providing exceptional service
            and expertise to our clients. With a focus on innovation and customer satisfaction, we
            strive to make the buying, selling, and renting process as seamless as possible.
          </p>
          <p>
            Our team of dedicated professionals is passionate about helping you achieve your real
            estate goals. Whether you're a first-time homebuyer or an experienced investor, we're
            here to guide you every step of the way.
          </p>
        </div>
        <div className="about-image">
          <img src="https://via.placeholder.com/800x600" alt="Office interior" />
        </div>
      </div>
    </section>
  );
}

export default About;

import React from 'react';
interface AboutProps {}
function About({}: AboutProps) {
  return (
    <section className="about">
      {' '}
      <div className="container">
        {' '}
        <h2>About Us</h2>{' '}
        <p>
          Netizens Technology is a forward-thinking technology company dedicated to providing
          innovative solutions for businesses of all sizes.
        </p>{' '}
        <p>
          Our mission is to empower your business with cutting-edge technology that drives growth
          and efficiency.
        </p>{' '}
      </div>{' '}
    </section>
  );
}
export default About;

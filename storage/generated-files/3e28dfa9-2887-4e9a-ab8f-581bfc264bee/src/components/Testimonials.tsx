import React from 'react';
function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechNova',
      rating: 5,
      text: 'LiveCode has revolutionized our development process. We can now deploy our applications faster than ever before with their cloud deployment tools and AI-powered suggestions. The platform is reliable and easy to use.',
    },
    {
      id: 2,
      name: 'James Carter',
      company: 'DevLabs',
      rating: 4,
      text: 'The integrated testing tools have improved our QA process significantly. I really appreciate the security features and the way they handle compliance. The support team is also very responsive.',
    },
    {
      id: 3,
      name: 'Emily Williams',
      company: 'CodeWorks',
      rating: 5,
      text: 'LiveCode is an essential tool for any developer. The AI suggestions help me write better code faster. The cloud deployment is seamless and the performance monitoring tools are top-notch.',
    },
  ];
  return (
    <section className="testimonials">
      {' '}
      <div className="container">
        {' '}
        <h2 className="testimonials__title">What Our Customers Say</h2>{' '}
        <div className="testimonials__cards">
          {' '}
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonials__card">
              {' '}
              <h3 className="testimonials__card__title">{testimonial.name}</h3>{' '}
              <p className="testimonials__card__company">{testimonial.company}</p>{' '}
              <div className="testimonials__card__rating">{'★'.repeat(testimonial.rating)}</div>{' '}
              <p className="testimonials__card__text">{testimonial.text}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Testimonials;

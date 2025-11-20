import React from 'react';
interface TestimonialsProps {}
function Testimonials({}: TestimonialsProps) {
  const testimonials = [
    {
      name: 'John Doe',
      rating: 5,
      text: 'Cypher Tech has revolutionized my financial planning. Highly recommend!',
    },
    { name: 'Jane Smith', rating: 4, text: 'Great customer service and competitive rates.' },
  ];
  return (
    <section className="testimonials">
      {' '}
      <div className="container">
        {' '}
        <h2>What Our Customers Say</h2>{' '}
        <div className="items-grid">
          {' '}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="item-card">
              {' '}
              <h3>{testimonial.name}</h3>{' '}
              <div className="rating">{'★'.repeat(testimonial.rating)}</div>{' '}
              <p>{testimonial.text}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Testimonials;

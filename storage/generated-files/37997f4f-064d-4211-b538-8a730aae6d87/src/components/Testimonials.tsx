import React from 'react';
import './App.css';
interface Testimonial {
  name: string;
  rating: number;
  review: string;
}
interface TestimonialsProps {}
function Testimonials({}: TestimonialsProps) {
  const testimonials: Testimonial[] = [
    { name: 'John Doe', rating: 5, review: 'Amazing shopping experience!' },
    { name: 'Jane Smith', rating: 4, review: 'Great products and fast delivery.' },
    { name: 'Sam Johnson', rating: 5, review: 'Highly recommend!' },
  ];
  return (
    <section className="testimonials" id="testimonials">
      {' '}
      <div className="container">
        {' '}
        <h2>What Our Customers Say</h2>{' '}
        <div className="testimonials-grid">
          {' '}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              {' '}
              <h3>{testimonial.name}</h3>{' '}
              <div className="rating">{'★'.repeat(testimonial.rating)}</div>{' '}
              <p>{testimonial.review}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Testimonials;

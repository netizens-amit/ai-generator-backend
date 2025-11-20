import React from 'react';
interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

function Testimonials() {
  const testimonials: Testimonial[] = [
    { name: 'John Doe', review: 'Great service and support!', rating: 5 },
    { name: 'Jane Smith', review: 'Absolutely reliable.', rating: 4 },
    { name: 'Alice Johnson', review: 'Highly recommend.', rating: 4.5 }
  ];

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p>{testimonial.review}</p>
            <h3>{testimonial.name}</h3>
            <div className="rating">
              {[...Array(testimonial.rating)].map((_, i) => <span key={i}>★</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
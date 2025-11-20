import React from 'react';

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  company: string;
}

function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: 'John Smith',
      review: 'Excellent service and great results!',
      rating: 5,
      company: 'Tech Corp',
    },
    {
      name: 'Jane Doe',
      review: 'Highly professional and reliable.',
      rating: 5,
      company: 'Business Inc',
    },
    {
      name: 'Mike Johnson',
      review: 'Outstanding experience from start to finish.',
      rating: 5,
      company: 'Solutions LLC',
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="rating">{''.repeat(testimonial.rating)}</div>
              <p className="review">"{testimonial.review}"</p>
              <div className="author">
                <p className="name">{testimonial.name}</p>
                <p className="company">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

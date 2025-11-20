import React from 'react';

interface TestimonialsProps {
  // Define props if needed
}

function Testimonials({}: TestimonialsProps) {
  const testimonialsData = [
    {
      id: 1,
      author: 'Jane Smith',
      text: 'CubeFinance has helped me achieve my financial goals with their expert advice and personalized service.',
      rating: 5,
    },
    {
      id: 2,
      author: 'John Doe',
      text: 'I highly recommend CubeFinance for their outstanding customer support and innovative financial solutions.',
      rating: 4,
    },
    {
      id: 3,
      author: 'Alice Johnson',
      text: 'The team at CubeFinance is knowledgeable, professional, and always willing to go the extra mile for their clients.',
      rating: 5,
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p>{testimonial.text}</p>
            <div className="rating">{'★'.repeat(testimonial.rating)}</div>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;

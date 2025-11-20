import React from 'react';
interface TestimonialsProps {}
function Testimonials({}: TestimonialsProps) {
  const testimonials = [
    {
      name: 'John Doe',
      company: 'Company A',
      rating: 5,
      message:
        'Netizens Technology has transformed our business with their cutting-edge solutions.',
    },
    {
      name: 'Jane Smith',
      company: 'Company B',
      rating: 4,
      message: 'Their customer support is exceptional.',
    },
  ];
  return (
    <section className="testimonials">
      {' '}
      <div className="container">
        {' '}
        <h2>What Our Customers Say</h2>{' '}
        <div className="grid grid-2">
          {' '}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              {' '}
              <h4>
                {testimonial.name} - {testimonial.company}
              </h4>{' '}
              <div className="rating">{'★'.repeat(testimonial.rating)}</div>{' '}
              <p>{testimonial.message}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
export default Testimonials;

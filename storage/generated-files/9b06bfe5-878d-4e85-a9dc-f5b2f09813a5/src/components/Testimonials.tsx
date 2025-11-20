import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
  rating: number;
}

interface TestimonialsProps {
  // Define props if needed
}

function Testimonials({}: TestimonialsProps) {
  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: 'Alice Smith',
      testimonial:
        'Hemlet Glob has transformed my career! The courses are engaging and the instructors are top-notch.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Bob Johnson',
      testimonial:
        'I highly recommend Hemlet Glob to anyone looking to expand their knowledge and skills. Great value!',
      rating: 4,
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p>{testimonial.testimonial}</p>
            <p className="rating">{'★'.repeat(testimonial.rating)}</p>
            <p>- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;

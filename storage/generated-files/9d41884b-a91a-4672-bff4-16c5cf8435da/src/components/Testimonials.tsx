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
      review:
        'Jems Tech has completely transformed our workflow. Their AI analytics tools have given us unprecedented insights into our operations.',
      rating: 5,
      company: 'TechCorp',
    },
    {
      name: 'Emily Johnson',
      review:
        'The cloud security solutions from Jems Tech are top-notch. We feel much more secure knowing our data is protected.',
      rating: 4,
      company: 'InnovateTech',
    },
    {
      name: 'Michael Chen',
      review:
        'Their 24/7 support has been instrumental in our success. We always get quick responses to our queries.',
      rating: 5,
      company: 'DigitalSolutions',
    },
  ];

  return (
    <section className="testimonials section" id="testimonials">
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

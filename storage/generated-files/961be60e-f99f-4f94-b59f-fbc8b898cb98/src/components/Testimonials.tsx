import React from 'react';

interface TestimonialsProps {
  // Define props if needed
}

function Testimonials({}: TestimonialsProps) {
  const rating = 5;
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>
              "Jainam Tech helped us find our dream home! The process was smooth and stress-free."
            </p>
            <div className="rating">{'★'.repeat(rating)}</div>
            <h4>- John Smith</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Excellent service and professional agents. I highly recommend Jainam Tech for all
              your real estate needs."
            </p>
            <div className="rating">{'★'.repeat(rating)}</div>
            <h4>- Alice Johnson</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Jainam Tech made selling our property a breeze. Their expertise and dedication were
              invaluable."
            </p>
            <div className="rating">{'★'.repeat(rating)}</div>
            <h4>- Bob Williams</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

import React from 'react';

interface ContactProps {
  // Add any props if needed
}

function Contact() {
  return (
    <section className="contact section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-form">
          <form>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" id="name" className="form-input" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" id="email" className="form-input" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                className="form-textarea"
                rows={5}
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

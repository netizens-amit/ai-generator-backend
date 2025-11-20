import React, { useState } from 'react';

interface ContactProps {
  // Define props if needed
}

function Contact({}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic
    alert('Form submitted successfully!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <div className="error">{errors.message}</div>}
            </div>
            <button type="submit" className="button">
              Send Message
            </button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Our Office</h2>
          <p>123 Finance Street, Suite 100</p>
          <p>New York, NY 10001</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@cubefinance.com</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;

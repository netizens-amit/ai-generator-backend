import React, { useState } from 'react';
import './App.css';
interface ContactProps {}
function Contact({}: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.match(/^[^s@]+@[^s@]+.[^s@]+$/)) {
      newErrors.email = 'Valid email is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', message: '' });
  };
  return (
    <section className="contact" id="contact">
      {' '}
      <div className="container">
        {' '}
        <h2>Contact Us</h2>{' '}
        <form onSubmit={handleSubmit}>
          {' '}
          <div className="form-group">
            {' '}
            <label>Name</label>{' '}
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />{' '}
            {errors.name && <span className="error">{errors.name}</span>}{' '}
          </div>{' '}
          <div className="form-group">
            {' '}
            <label>Email</label>{' '}
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />{' '}
            {errors.email && <span className="error">{errors.email}</span>}{' '}
          </div>{' '}
          <div className="form-group">
            {' '}
            <label>Message</label>{' '}
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>{' '}
          </div>{' '}
          <button type="submit">Send Message</button>{' '}
        </form>{' '}
      </div>{' '}
    </section>
  );
}
export default Contact;

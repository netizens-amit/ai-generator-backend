import React, { useState } from 'react';
interface ContactFormState {
  name: string;
  email: string;
  message: string;
}
function Contact() {
  const [formData, setFormData] = useState<ContactFormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
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
    <section className="contact">
      {' '}
      <div className="container">
        {' '}
        <h2 className="contact__title">Get in Touch</h2>{' '}
        <form className="contact__form" onSubmit={handleSubmit}>
          {' '}
          <div>
            {' '}
            <label htmlFor="name">Name</label>{' '}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />{' '}
            {errors.name && <p className="error">{errors.name}</p>}{' '}
          </div>{' '}
          <div>
            {' '}
            <label htmlFor="email">Email</label>{' '}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />{' '}
            {errors.email && <p className="error">{errors.email}</p>}{' '}
          </div>{' '}
          <div>
            {' '}
            <label htmlFor="message">Message</label>{' '}
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
            ></textarea>{' '}
            {errors.message && <p className="error">{errors.message}</p>}{' '}
          </div>{' '}
          <button type="submit">Send Message</button>{' '}
        </form>{' '}
      </div>{' '}
    </section>
  );
}
export default Contact;

import React, { useState, useEffect } from 'react';
import './App.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}
function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!/^[\s@]+@[\s@]+\.[\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  const features: Feature[] = [
    {
      icon: '',
      title: 'Fast Shipping',
      description:
        'Enjoy speedy delivery right to your doorstep. We ensure your products arrive quickly and safely.',
    },
    {
      icon: '',
      title: 'Secure Checkout',
      description:
        'Your payment information is always protected with our secure checkout system. Shop with confidence.',
    },
    {
      icon: '',
      title: 'Premium Quality',
      description:
        'We source only the highest quality products to ensure your satisfaction. Experience the difference.',
    },
    {
      icon: '',
      title: 'Easy Returns',
      description:
        'Not satisfied? No problem! Our easy return policy makes returns simple and hassle-free.',
    },
  ];

  return (
    <div className="app">
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav">
          <div className="logo">Netizens Tech</div>
          <nav className={`desktop-menu ${menuOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={() => setMenuOpen(false)}></button>
            <a href="#" onClick={() => scrollToSection('hero')}>
              Home
            </a>
            <a href="#" onClick={() => scrollToSection('features')}>
              Features
            </a>
            <a href="#" onClick={() => scrollToSection('about')}>
              About
            </a>
            <a href="#" onClick={() => scrollToSection('contact')}>
              Contact
            </a>
          </nav>
          <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}></button>
        </div>
      </header>

      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Shop the Latest Trends at Unbeatable Prices</h1>
          <p className="hero-subtitle">
            Upgrade your style with our curated collection. Free shipping on orders over $50!
          </p>
          <div className="hero-buttons">
            <button className="shop-now-button">Shop Now</button>
            <button className="view-deals-button">View Deals</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="emoji-stack">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About Netizens Tech</h2>
          <p>
            At Netizens Tech, our mission is to provide you with the latest trends and highest
            quality products at prices you'll love. We believe that everyone deserves to express
            their unique style without breaking the bank.'
          </p>
          <p>
            What sets us apart is our commitment to customer satisfaction. We offer fast shipping,
            easy returns, and a dedicated customer support team to assist you with any questions or
            concerns. Experience the Netizens Tech difference today!
          </p>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`form-input ${formErrors.name ? 'error' : ''}`}
              />
              {formErrors.name && <div className="form-error">{formErrors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`form-input ${formErrors.email ? 'error' : ''}`}
              />
              {formErrors.email && <div className="form-error">{formErrors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`form-input ${formErrors.message ? 'error' : ''}`}
              />
              {formErrors.message && <div className="form-error">{formErrors.message}</div>}
            </div>
            <button type="submit" className="submit-button" disabled={formSubmitted}>
              {formSubmitted ? 'Submitting...' : 'Submit'}
            </button>
            {formSubmitted && <div className="success-message">Message sent successfully!</div>}
          </form>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <p> 2025 Netizens Tech. All rights reserved.</p>
          <div className="social-links">
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
          <div className="quick-links">
            <a href="#">Shipping Info</a>
            <a href="#">Returns Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

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
;
function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
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
;
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    ;
    if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    ;
    if (!/^[^
@]+@[^
@]+\.[^
@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    ;
    if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
;
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
;
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
;
  const features = [
    {
      icon: '',
      title: 'Expert-Led Instruction',
      description: 'Learn directly from seasoned industry professionals who bring real-world experience and insights to every lesson.'
    },
    {
      icon: '',
      title: 'Flexible Learning Options',
      description: 'Study at your own pace with on-demand courses, live online sessions, and customizable learning paths to fit your schedule.'
    },
    {
      icon: '',
      title: 'Industry-Recognized Certifications',
      description: 'Boost your resume and credibility with valuable certifications that are recognized and respected by employers worldwide.'
    },
    {
      icon: '',
      title: 'Dedicated Career Support',
      description: 'Receive personalized guidance on resume building, interview preparation, and job placement to land your dream role.'
    }
  ];

  return (
    <div className="app">
      <header className={`header ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="container nav-content">
          <div className="logo" onClick={() => scrollToSection('hero')}>
            Kenil Vastapar
          </div>
          <nav className={`nav-menu ${menuOpen ? 'open' : ''}" aria-label="Desktop navigation`}>
            <ul className="nav-list">
              <li><button type="button" onClick={() => scrollToSection('hero')}>Home</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Features</button></li>
              <li><button type="button" onClick={() => scrollToSection('about')}>About</button></li>
              <li><button type="button" onClick={() => scrollToSection('contact')}>Contact</button></li>
            </ul>
          </nav>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu-overlay">
            <nav className="mobile-nav-menu" aria-label="Mobile navigation">
              <ul>
                <li><button type="button" onClick={() => scrollToSection('hero')}>Home</button></li>
                <li><button type="button" onClick={() => scrollToSection('features')}>Features</button></li>
                <li><button type="button" onClick={() => scrollToSection('about')}>About</button></li>
                <li><button type="button" onClick={() => scrollToSection('contact')}>Contact</button></li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">Transform Your Career with Expert-Led Training</h1>
              <p className="hero-subtitle">Unlock your potential and achieve your professional goals with our industry-leading courses and dedicated career support.</p>
              <div className="hero-buttons">
                <button type="button" className="button primary-button" onClick={() => scrollToSection('contact')}>Enroll Now</button>
                <button type="button" className="button secondary-button" onClick={() => scrollToSection('features')}>Browse Courses</button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-card">
                <span role="img" aria-label="Graduation cap"></span>
                <h3>Achieve Certification</h3>
                <p>Earn industry-recognized credentials that validate your expertise and open new doors.</p>
              </div>
              <div className="hero-visual-card">
                <span role="img" aria-label="Briefcase"></span>
                <h3>Career Advancement</h3>
                <p>Gain the skills needed to excel in your current role or pivot to a high-demand career path.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">Why Choose Kenil Vastapar?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <span className="feature-icon" role="img" aria-label={feature.title}>{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">About Kenil Vastapar</h2>
            <div className="about-content">
              <p>
                At Kenil Vastapar, our mission is to empower individuals through transformative education. We believe that everyone deserves the opportunity to acquire in-demand skills, advance their careers, and achieve their full potential. Our comprehensive courses are meticulously designed to provide practical, hands-on learning experiences guided by industry leaders.
              </p>
              <p>
                We stand apart with our commitment to student success, offering not just exceptional curriculum but also robust career support and a vibrant learning community. Our flexible online platform ensures that quality education is accessible to all, regardless of location or schedule. Join a thriving network of learners and professionals who are shaping the future.
              </p>
              <p>
                Your journey to mastering new skills and unlocking unparalleled career opportunities begins here. With Kenil Vastapar, you gain more than just knowledge; you gain a pathway to a brighter, more fulfilling professional life.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                />
                {formErrors.name && <p id="name-error" className="form-error">{formErrors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && <p id="email-error" className="form-error">{formErrors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  className={`form-input textarea ${formErrors.message ? 'input-error' : ''}`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                ></textarea>
                {formErrors.message && <p id="message-error" className="form-error">{formErrors.message}</p>}
              </div>
              <button type="submit" className="button primary-button submit-button">
                {formSubmitted ? 'Message Sent!' : 'Send Message'}
              </button>
              {formSubmitted && <p className="form-success" role="status">Thank you for your message! We will get back to you soon.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-copyright">
            <p>&copy; 2025 Kenil Vastapar. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <nav aria-label="Footer navigation">
              <ul className="footer-nav-list">
                <li><button type="button" onClick={() => scrollToSection('hero')}>Home</button></li>
                <li><button type="button" onClick={() => scrollToSection('features')}>Courses</button></li>
                <li><button type="button" onClick={() => scrollToSection('about')}>About Us</button></li>
                <li><button type="button" onClick={() => scrollToSection('contact')}>Contact</button></li>
              </ul>
            </nav>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><span role="img" aria-label="Facebook icon"></span></a>
            <a href="#" aria-label="Twitter"><span role="img" aria-label="Twitter icon"></span></a>
            <a href="#" aria-label="Instagram"><span role="img" aria-label="Instagram icon"></span></a>
            <a href="#" aria-label="LinkedIn"><span role="img" aria-label="LinkedIn icon"></span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

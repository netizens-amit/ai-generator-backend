import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let errors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!form.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!form.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (!form.message) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission (replace with actual API call)
      alert("Form submitted successfully!");
      setForm({ name: "", email: "", message: "" }); // Reset form
      setFormErrors({ name: "", email: "", message: "" }); // Clear errors
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Header/Nav */}
      <header className="header">
        <div className="logo">QuickBite</div>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-links">
            <li>
              <button onClick={() => scrollToSection(heroRef)}>Hero</button>
            </li>
            <li>
              <button onClick={() => scrollToSection(featuresRef)}>Features</button>
            </li>
            <li>
              <button onClick={() => scrollToSection(aboutRef)}>About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection(contactRef)}>Contact</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-content">
          <h1>Delicious food, delivered fast.</h1>
          <p>Your favorite meals, just a tap away.</p>
          <button>Order Now</button>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Fast Delivery</h3>
            <p>Get your food delivered in under 30 minutes.</p>
          </div>
          <div className="feature-item">
            <h3>Wide Selection</h3>
            <p>Choose from a wide variety of restaurants and cuisines.</p>
          </div>
          <div className="feature-item">
            <h3>Easy Ordering</h3>
            <p>Order your food with just a few taps.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="about">
        <h2>About QuickBite</h2>
        <p>
          QuickBite is a technology company that connects people with the best restaurants in their
          city. We believe that food is a universal language, and we're passionate about making it
          easier for people to enjoy the meals they love.
        </p>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
            {formErrors.name && <div className="error">{formErrors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {formErrors.email && <div className="error">{formErrors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            {formErrors.message && <div className="error">{formErrors.message}</div>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

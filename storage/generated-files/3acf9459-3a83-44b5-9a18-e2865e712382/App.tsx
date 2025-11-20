import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
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

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors: {
      name: string;
      email: string;
      message: string;
    } = {
      name: "",
      email: "",
      message: "",
    };
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message) {
      errors.message = "Message is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission (replace with actual API call)
      console.log("Form submitted:", formData);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFormErrors({
        name: "",
        email: "",
        message: "",
      });

      alert("Form submitted successfully!");
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  return (
    <div className="App">
      {/* Header/Nav */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-primary">
            XampPack
          </a>
          <nav className={`hidden md:flex items-center space-x-6`}>
            <button onClick={() => scrollToSection(heroRef)} className="hover:text-secondary">
              Hero
            </button>
            <button onClick={() => scrollToSection(featuresRef)} className="hover:text-secondary">
              Features
            </button>
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-secondary">
              About
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-secondary">
              Contact
            </button>
            <a
              href="#"
              className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md shadow-md transition duration-300"
            >
              Get Started
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.707 5.293a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12 5.293 17.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (Conditional Rendering) */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-2 z-10">
            <nav className="flex flex-col items-center space-y-3">
              <button onClick={() => scrollToSection(heroRef)} className="hover:text-secondary">
                Hero
              </button>
              <button onClick={() => scrollToSection(featuresRef)} className="hover:text-secondary">
                Features
              </button>
              <button onClick={() => scrollToSection(aboutRef)} className="hover:text-secondary">
                About
              </button>
              <button onClick={() => scrollToSection(contactRef)} className="hover:text-secondary">
                Contact
              </button>
              <a
                href="#"
                className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md shadow-md transition duration-300"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="hero py-20 bg-gradient-to-r from-orange-100 to-yellow-50">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Unlock Your Financial Potential with XampPack
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your partner in financial success. We provide the tools and resources you need to
            achieve your financial goals.
          </p>
          <a
            href="#"
            className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-md text-lg shadow-lg transition duration-300"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">Financial Planning</h3>
              <p className="text-gray-600">
                Create a personalized financial plan to achieve your goals.
              </p>
            </div>
            <div className="feature-card bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">Investment Tools</h3>
              <p className="text-gray-600">
                Access powerful investment tools and resources to make informed decisions.
              </p>
            </div>
            <div className="feature-card bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">Expert Advice</h3>
              <p className="text-gray-600">
                Get expert financial advice from our team of experienced professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="about py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://via.placeholder.com/500x300"
                alt="About Us"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">
                XampPack is a leading financial services company dedicated to helping individuals
                and businesses achieve their financial goals. With a team of experienced
                professionals and a commitment to innovation, we provide the tools and resources you
                need to succeed.
              </p>
              <p className="text-gray-700">
                Our mission is to empower our clients to make informed financial decisions and build
                a secure future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Contact Us</h2>
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs italic">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs italic">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-xs italic">{formErrors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white text-center">
        <p>&copy; {new Date().getFullYear()} XampPack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

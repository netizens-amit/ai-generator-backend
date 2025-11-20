document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const authLinks = document.querySelector('.auth-links');

  mobileMenuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    authLinks.classList.toggle('active');
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // Form Validation (Example)
  const signupButton = document.querySelector('#signup');
  if (signupButton) {
    signupButton.addEventListener('click', function (e) {
      // Basic email validation (replace with more robust validation)
      const email = prompt('Enter your email:');
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        e.preventDefault(); // Prevent signup if email is invalid
      }
    });
  }

  // Scroll Animations (Example using Intersection Observer)
  const sections = document.querySelectorAll('section');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2, // Adjust as needed
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view'); // Add a class to trigger animation
        // observer.unobserve(entry.target); // Stop observing once animated
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

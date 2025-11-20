document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const headerOffset = document.querySelector('.header').offsetHeight; // Get header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      if (document.querySelector('.hamburger').classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Optional: prevent scrolling when menu is open
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Navbar scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageTextarea = document.getElementById('message');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Clear previous errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      // Validate Name
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[\S+@\S+\.\S+]+$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Validate Message
      if (messageTextarea.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
      } else if (messageTextarea.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long.';
        isValid = false;
      }

      if (isValid) {
        alert('Form submitted successfully!');
        // Here you would typically send the form data to a server
        contactForm.reset();
      }
    });
  }

  // Scroll animations
  const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .animate-on-scroll');

  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1, // Trigger when 10% of the item is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  animateElements.forEach((element) => {
    observer.observe(element);
  });
});

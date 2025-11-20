document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - document.getElementById('navbar').offsetHeight, // Offset for fixed navbar
          behavior: 'smooth',
        });
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger-menu');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');
      const formSuccess = document.getElementById('form-success');

      // Clear previous errors/success
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formSuccess.textContent = '';

      if (name.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
      }

      if (email.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (message.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
      }

      if (isValid) {
        // In a real application, you would send this data to a server
        console.log('Form Submitted:', {
          name: name.value,
          email: email.value,
          message: message.value,
        });
        formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
        contactForm.reset();
      }
    });
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1, // When 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('home');

  const applyNavbarStyle = () => {
    if (window.scrollY > (heroSection ? heroSection.clientHeight / 2 : 100)) {
      // Add scrolled class after scrolling past half of hero or 100px
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', applyNavbarStyle);
  applyNavbarStyle(); // Apply on page load in case of refresh or deep link
});

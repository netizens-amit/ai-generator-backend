document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.site-header');
  const contactForm = document.getElementById('contact-form');
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Form validation
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // Reset errors
      nameError.style.display = 'none';
      emailError.style.display = 'none';
      messageError.style.display = 'none';

      // Validate Name
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        nameError.style.display = 'block';
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        emailError.style.display = 'block';
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        isValid = false;
      }

      // Validate Message
      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message cannot be empty.';
        messageError.style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        // Simulate form submission
        alert('Form submitted successfully!');
        contactForm.reset();
        console.log('Form Data:', {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
        });
      } else {
        console.log('Form has validation errors.');
      }
    });
  }

  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Apply staggered delay for feature cards
        if (entry.target.classList.contains('feature-card')) {
          const index = Array.from(animateElements).indexOf(entry.target);
          entry.target.style.setProperty('--delay', `${(index - 1) * 0.15}s`); // Adjust index for feature cards specifically
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Manually trigger hero animations if not already visible
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Ensure hero animations play on load without requiring scroll
    const heroObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.01, // Very low threshold to ensure it triggers immediately if visible
    };

    const heroObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, heroObserverOptions);
    heroObserver.observe(heroSection);
  }
});

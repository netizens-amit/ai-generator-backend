document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('header');
  const contactForm = document.getElementById('contactForm');
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const fadeInElements = document.querySelectorAll('.animate-fade-in-up');
  function setupSmoothScrolling() {
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth',
          });
        }
      });
    });
  }
  function setupMobileMenuToggle() {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      });
    });
  }
  function setupFormValidation() {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      [nameInput, emailInput, messageInput].forEach((input) => {
        input.classList.remove('error');
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
          errorMessage.remove();
        }
      });
      if (nameInput.value.trim() === '') {
        displayError(nameInput, 'Name cannot be empty.');
        isValid = false;
      }
      if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
        displayError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }
      if (messageInput.value.trim() === '') {
        displayError(messageInput, 'Message cannot be empty.');
        isValid = false;
      }
      if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
      }
    });
  }
  function displayError(inputElement, message) {
    inputElement.classList.add('error');
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
  }
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function setupScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    animateElements.forEach((el) => {
      observer.observe(el);
    });
    fadeInElements.forEach((el) => {
      observer.observe(el);
    });
  }
  function setupNavbarScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  (function () {
    setupSmoothScrolling();
    setupMobileMenuToggle();
    setupFormValidation();
    setupScrollAnimations();
    setupNavbarScrollEffect();
  })();
});

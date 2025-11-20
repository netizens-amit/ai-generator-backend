document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      const navMenu = document.querySelector('.nav-menu');
      const menuToggle = document.querySelector('.menu-toggle');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
  const expanded = menuToggle.classList.contains('active');
  menuToggle.setAttribute('aria-expanded', expanded);
});
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.querySelector('.form-status');
function showValidationError(input, message) {
  const errorDiv = document.getElementById(input.id + '-error');
  errorDiv.textContent = message;
  input.setAttribute('aria-invalid', 'true');
  input.classList.add('invalid');
}
function clearValidationError(input) {
  const errorDiv = document.getElementById(input.id + '-error');
  errorDiv.textContent = '';
  input.setAttribute('aria-invalid', 'false');
  input.classList.remove('invalid');
}
function validateField(input) {
  let isValid = true;
  let errorMessage = '';
  if (!input.value.trim()) {
    isValid = false;
    errorMessage = 'This field is required.';
  } else if (input.name === 'name') {
    if (input.value.trim().length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters.';
    }
  } else if (input.name === 'email') {
    if (!input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
  } else if (input.name === 'message') {
    if (input.value.trim().length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters.';
    }
  }
  if (!isValid) {
    showValidationError(input, errorMessage);
  } else {
    clearValidationError(input);
  }
  return isValid;
}
[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener('input', () => validateField(input));
  input.addEventListener('blur', () => validateField(input));
});
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  formStatus.classList.remove('success', 'error');
  const isNameValid = validateField(nameInput);
  const isEmailValid = validateField(emailInput);
  const isMessageValid = validateField(messageInput);
  if (isNameValid && isEmailValid && isMessageValid) {
    formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
    formStatus.classList.add('success');
    contactForm.reset();
    [nameInput, emailInput, messageInput].forEach((input) => clearValidationError(input));
  } else {
    formStatus.textContent = 'Please correct the errors in the form.';
    formStatus.classList.add('error');
  }
});
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
animateOnScrollElements.forEach((el) => {
  observer.observe(el);
});

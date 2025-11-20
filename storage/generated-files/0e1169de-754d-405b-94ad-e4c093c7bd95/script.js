document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('contactForm');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
  function revealSection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }
  const sectionObserver = new IntersectionObserver(revealSection, observerOptions);
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('open');
        }
      }
    });
  });
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    if (name.value.trim() === '') {
      alert('Please enter your name.');
      name.focus();
      isValid = false;
    } else if (email.value.trim() === '') {
      alert('Please enter your email.');
      email.focus();
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      alert('Please enter a valid email address.');
      email.focus();
      isValid = false;
    } else if (message.value.trim() === '') {
      alert('Please enter your message.');
      message.focus();
      isValid = false;
    }
    if (isValid) {
      alert('Message sent successfully!');
      contactForm.reset();
    }
  });
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\\].,;:\s@"]+(\.[^<>()[\\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});

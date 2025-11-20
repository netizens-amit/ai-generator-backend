document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling
  document.querySelectorAll('.scroll-link').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector('.navbar').offsetHeight; // Get dynamic header height
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset - 20; // Added 20px for extra padding

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu-list');
        const hamburger = document.getElementById('hamburger-menu');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu-list');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navMenu.style.height = navMenu.classList.contains('active') ? `${navMenu.scrollHeight}px` : '0';
  });

  // Close menu when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target) &&
      navMenu.classList.contains('active')
    ) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      navMenu.style.height = '0';
    }
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      // Change 50 to adjust when the effect starts
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    const nameInput = this.querySelector('#name');
    const emailInput = this.querySelector('#email');
    const messageInput = this.querySelector('#message');

    const inputs = [nameInput, emailInput, messageInput];

    inputs.forEach((input) => {
      const errorMessageDiv = this.querySelector(`.error-message[data-for='${input.id}']`);
      errorMessageDiv.textContent = ''; // Clear previous error

      if (!input.value.trim()) {
        errorMessageDiv.textContent = `${input.previousElementSibling.textContent} is required.`;
        isValid = false;
      } else if (input.type === 'email' && !validateEmail(input.value.trim())) {
        errorMessageDiv.textContent = 'Please enter a valid email address.';
        isValid = false;
      }
    });

    if (isValid) {
      // Simulate form submission
      console.log('Form Submitted', {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
      });

      formSuccess.style.display = 'block';
      this.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    } else {
      formSuccess.style.display = 'none';
    }
  });

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  // Scroll Animations (Intersection Observer)
  const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15, // Element is visible when 15% of it is in the viewport
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  animateOnScrollElements.forEach((element) => {
    observer.observe(element);
  });
});

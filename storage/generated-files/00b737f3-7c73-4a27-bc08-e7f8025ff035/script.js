document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // Carousel
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    if (n >= slides.length) currentSlide = 0;
    else if (n < 0) currentSlide = slides.length - 1;
    else currentSlide = n;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Pricing Toggle
  const toggleButtons = document.querySelectorAll('.btn-toggle');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      toggleButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Pricing Calculator
  const userSlider = document.getElementById('users');
  const userCount = document.getElementById('user-count');

  userSlider.addEventListener('input', () => {
    userCount.textContent = userSlider.value;
  });

  // FAQ Filtering
  const categoryButtons = document.querySelectorAll('.faq-category');
  const faqQuestions = document.querySelectorAll('.faq-question');

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      categoryButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      faqQuestions.forEach((question) => {
        if (question.dataset.category === category || category === 'general') {
          question.style.display = 'block';
        } else {
          question.style.display = 'none';
        }
      });
    });
  });

  // Modal
  const trialModal = document.getElementById('trial-modal');
  const startTrialBtn = document.getElementById('start-trial');
  const closeTrial = document.getElementById('close-trial');

  startTrialBtn.addEventListener('click', () => {
    trialModal.style.display = 'flex';
  });

  closeTrial.addEventListener('click', () => {
    trialModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === trialModal) {
      trialModal.style.display = 'none';
    }
  });

  // Form Validation
  const trialForm = document.getElementById('trial-form');

  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;

    if (name && email && company) {
      // In a real app, submit to server here
      alert('Account created successfully! Check your email.');
      trialModal.style.display = 'none';
      trialForm.reset();
    } else {
      alert('Please fill in all fields');
    }
  });

  // Newsletter Signup
  const newsletterForm = document.getElementById('newsletter-form');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('newsletter-email').value;

    if (email) {
      // In a real app, submit to server here
      alert('Thank you for subscribing!');
      newsletterForm.reset();
    }
  });

  // Live Chat
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatMessages = document.getElementById('chat-messages');

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageInput = document.getElementById('chat-message');
    const message = messageInput.value.trim();

    if (message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'received');
      messageElement.innerHTML = `<p>${message}</p>`;

      chatMessages.appendChild(messageElement);
      messageInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate response
      setTimeout(() => {
        const responseElement = document.createElement('div');
        responseElement.classList.add('message', 'received');
        responseElement.innerHTML = `<p>Thanks for your message! Our team will get back to you shortly.</p>`;

        chatMessages.appendChild(responseElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  });

  // API Playground
  const runApiBtn = document.getElementById('run-api');
  const apiInput = document.getElementById('api-input');
  const apiOutput = document.getElementById('api-output');

  runApiBtn.addEventListener('click', () => {
    const input = apiInput.value.trim();

    if (input) {
      // Simulated API response
      apiOutput.textContent = `{
  "status": "success",
  "request": "${input}",
  "response": {
    "data": [
      {
        "id": 1,
        "title": "API Result",
        "description": "This is a simulated response"
      }
    ]
  }
}`;
    } else {
      apiOutput.textContent = 'Please enter an API request';
    }
  });

  // Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with fade-in effect
  document.querySelectorAll('.feature-card, .testimonial-card, .integration-logo').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

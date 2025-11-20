function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth',
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const successMessage = document.getElementById('success-message');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const header = document.querySelector('header');
  function validateForm() {
    let isValid = true;
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      isValid = false;
    } else {
      nameError.textContent = '';
    }
    if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Invalid email format';
      isValid = false;
    } else {
      emailError.textContent = '';
    }
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      isValid = false;
    } else {
      messageError.textContent = '';
    }

    return isValid;
  }
  function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
      // Simulate form submission success
      successMessage.textContent = 'Form submitted successfully!';
      form.reset();

      // Clear error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
    }
  });

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('show');
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
});

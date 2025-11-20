function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth',
  });
}
const form = document.getElementById('contactForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');

  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  successMessage.textContent = '';
  if (nameInput.value.length < 2) {
    nameError.textContent = 'Name must be at least 2 characters.';
    isValid = false;
  }
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }
  if (messageInput.value.length < 10) {
    messageError.textContent = 'Message must be at least 10 characters.';
    isValid = false;
  }
  if (isValid) {
    successMessage.textContent = 'Form submitted successfully!';
    form.reset();
  }
});
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

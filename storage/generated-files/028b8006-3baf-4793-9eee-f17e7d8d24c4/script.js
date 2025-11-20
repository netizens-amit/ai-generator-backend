document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
  });
  document.querySelectorAll('a[href^=#]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    alert('Message sent successfully!');
    this.reset();
  });
  const filterWork = (category) => {
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card) => {
      card.style.display =
        category === 'all' || card.getAttribute('data-category') === category ? 'block' : 'none';
    });
  };
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
  document.body.classList.toggle('dark-mode', localStorage.getItem('theme') === 'dark');
});

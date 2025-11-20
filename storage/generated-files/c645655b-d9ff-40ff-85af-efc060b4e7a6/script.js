const navLinks = document.getElementById('nav-links');
function toggleMenu() {
  navLinks.classList.toggle('show');
}
document.querySelectorAll('a[href^=#]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

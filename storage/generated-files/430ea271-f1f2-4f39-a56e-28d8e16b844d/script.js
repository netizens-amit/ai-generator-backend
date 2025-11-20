// Smooth scrolling (optional)
/*document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});*/

// Countdown timer (example)
function updateCountdown() {
  const now = new Date();
  const targetDate = new Date();
  targetDate.setDate(now.getDate() + 1); // Set target to tomorrow
  targetDate.setHours(0, 0, 0, 0);

  const timeLeft = targetDate.getTime() - now.getTime();

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.querySelector('.countdown').textContent =
    `Ends in: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);

// Basic form validation (example)
/*const newsletterForm = document.querySelector('.newsletter-signup form');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.querySelector('.newsletter-signup input');
    if (!emailInput.value.includes('@')) {
        alert('Please enter a valid email address.');
    }
});*/

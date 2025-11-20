// Smooth scroll navigation
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close mobile menu after click
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Mobile hamburger menu
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Form validation
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    event.preventDefault(); // Prevent form submission
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    event.preventDefault(); // Prevent form submission
    return;
  }

  // Basic email validation function
  function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }

  // You can add code here to submit the form data to a server
  // For demonstration purposes, we'll just log the data to the console
  console.log("Form submitted!");
  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Message: " + message);

  // Optionally, you can reset the form fields after successful submission
  form.reset();
  event.preventDefault();
});

// Scroll animations (basic example - more advanced implementations are possible)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show"); // You'll need to define a 'show' class in your CSS
    } else {
      entry.target.classList.remove("show"); // Keep this line if you want the animation to trigger only once
    }
  });
});

const hiddenElements = document.querySelectorAll(".feature-card");
hiddenElements.forEach((el) => observer.observe(el));

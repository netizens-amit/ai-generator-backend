document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  function smoothScroll(target) {
    if (target.startsWith("#")) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = target;
    }
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll(link.getAttribute("href"));
      if (navList.classList.contains("active")) {
        menuToggle.setAttribute("aria-expanded", "false");
        navList.classList.remove("active");
      }
    });
  });
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
    menuToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("active");
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;
    formStatus.textContent = "";
    formStatus.classList.remove("success", "error");
    const nameInput = contactForm.elements["name"];
    const emailInput = contactForm.elements["email"];
    const messageInput = contactForm.elements["message"];
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach((input) => {
      input.classList.remove("invalid");
    });
    if (nameInput.value.trim().length < 2) {
      isValid = false;
      nameInput.classList.add("invalid");
      displayError(nameInput, "Name must be at least 2 characters.");
    }
    if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+/.test(emailInput.value)) {
      isValid = false;
      emailInput.classList.add("invalid");
      displayError(emailInput, "Please enter a valid email address.");
    }
    if (messageInput.value.trim().length < 10) {
      isValid = false;
      messageInput.classList.add("invalid");
      displayError(messageInput, "Message must be at least 10 characters.");
    }
    if (isValid) {
      formStatus.textContent = "Sending message...";
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        formStatus.textContent = "Message sent successfully! We will get back to you shortly.";
        formStatus.classList.add("success");
        contactForm.reset();
        inputs.forEach((input) => {
          input.classList.remove("invalid");
        });
      } catch (error) {
        formStatus.textContent = "Failed to send message. Please try again later.";
        formStatus.classList.add("error");
      }
    } else {
      formStatus.textContent = "Please correct the errors above.";
      formStatus.classList.add("error");
    }
  });
  function displayError(inputElement, message) {
    let errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = message;
    } else {
      errorElement = document.createElement("p");
      errorElement.classList.add("error-message");
      errorElement.style.color = "#f8d7da";
      errorElement.style.fontSize = "0.85em";
      errorElement.style.marginTop = "5px";
      errorElement.textContent = message;
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
  }
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });
});

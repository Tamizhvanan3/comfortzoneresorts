document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const bookingForm = document.getElementById("bookingForm");
  const bookingMessage = document.getElementById("bookingMessage");
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  const navCollapse = document.getElementById("mainNav");

  // Footer year
  year.textContent = new Date().getFullYear();

  // Header + back-to-top
  function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > 50);
    backToTop.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile menu closes after clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Active navigation item
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));

  // Reveal animations
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Booking date setup
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  checkIn.min = localToday;
  checkOut.min = localToday;

  checkIn.addEventListener("change", () => {
    if (checkIn.value) {
      checkOut.min = checkIn.value;

      if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
      }
    }
  });

  // Front-end booking form demo
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (checkIn.value && checkOut.value && checkOut.value > checkIn.value) {
      bookingMessage.textContent =
        "Thank you! Your dates are selected. Connect this form to your booking system to complete the reservation.";
    } else {
      bookingMessage.textContent =
        "Please select a valid check-in and check-out date.";
    }
  });
});

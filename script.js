/* ===============================
   Portfolio Script — Vince Carl Rosales
   Handles navigation, smooth scroll, form feedback, and interactivity
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  // ===== Set Current Year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Smooth Scroll Navigation =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // ===== Mobile Navigation Toggle =====
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });

    // Close menu when clicking a link
    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navList.classList.contains("show")) {
          navList.classList.remove("show");
        }
      });
    });
  }

  // ===== Contact Form (Simulated Sending) =====
  const form = document.getElementById("contactForm");
  const notice = document.getElementById("formNotice");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit']");
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending...";

      // Simulate delay
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        form.reset();

        if (notice) {
          notice.textContent =
            "✅ Message prepared successfully (simulated). Connect to an email backend to send messages for real.";
          notice.style.color = "#9ef0e6";
        }
      }, 1000);
    });
  }

  // ===== Highlight Active Section on Scroll =====
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-list a");

  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ===== Optional: Profile Photo Preview (for upload feature) =====
  window.previewProfilePhoto = function (file) {
    if (!file) return;
    const img = document.getElementById("profilePhoto");
    const reader = new FileReader();
    reader.onload = ev => { img.src = ev.target.result; };
    reader.readAsDataURL(file);
  };

  // ===== Animate Scroll Reveal (Simple fade-in) =====
  const fadeEls = document.querySelectorAll(".section, .card, .proj, .lab-card");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => fadeObserver.observe(el));
});

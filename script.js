/* ═══════════════════════════════════════════════════════
   SIPHELELE MFUSI — BUSINESS WEBSITE
   script.js
═══════════════════════════════════════════════════════ */

// ── NAVBAR: scroll effect + active links ─────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── HAMBURGER MENU ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ── SCROLL REVEAL ────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1800;
      const step   = Math.ceil(target / (duration / 16));
      let current  = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 16);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ── PRICING TABS ─────────────────────────────────────
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabCv     = document.getElementById('tab-cv');
const tabWeb    = document.getElementById('tab-web');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.getAttribute('data-tab') === 'cv') {
      tabCv.classList.remove('hidden');
      tabWeb.classList.add('hidden');
      tabCv.classList.remove('four');
    } else {
      tabWeb.classList.remove('hidden');
      tabCv.classList.add('hidden');
      tabWeb.classList.add('four');

      // Re-trigger reveal for newly shown cards
      tabWeb.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 50);
      });
    }
  });
});

// ── CONTACT FORM ─────────────────────────────────────
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate submission (replace with real backend / EmailJS / Formspree)
  setTimeout(() => {
    submitBtn.textContent = 'Send Message ✈';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }, 1200);
});

// ── SMOOTH SCROLL for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── ACTIVE TAB: show 4-col grid for web pricing ──────
// Initialise web tab as 4-column when opened
tabWeb.classList.add('four');

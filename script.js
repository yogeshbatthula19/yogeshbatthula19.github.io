/* ===== TYPED TEXT EFFECT ===== */
const typedLines = [
  'Full Stack Developer',
  'Open Source Contributor',
  'Problem Solver',
  'UI/UX Enthusiast',
];
let lineIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = typedLines[lineIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeLoop(); }, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      lineIdx = (lineIdx + 1) % typedLines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 95);
}
typeLoop();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .contact-grid, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name    = (data.get('name')    || '').trim();
  const email   = (data.get('email')   || '').trim();
  const subject = (data.get('subject') || '').trim();
  const message = (data.get('message') || '').trim();

  if (!name || !email || !subject || !message) {
    showNote('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showNote('Please enter a valid email address.', 'error');
    return;
  }

  const mailtoHref =
    `mailto:yogeshbatthula19@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(`Hi Yogesh,\n\n${message}\n\nBest,\n${name}\n${email}`)}`;

  window.location.href = mailtoHref;
  showNote('Opening your email client… Thank you! 🎉', 'success');
  contactForm.reset();
});

function showNote(msg, type) {
  formNote.textContent = msg;
  formNote.className = `form-note ${type}`;
}

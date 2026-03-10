/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== FOOTER YEAR ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== STAGGERED CARD REVEAL (spring physics) ===== */
const cards = Array.from(document.querySelectorAll(
  '.card, .cs-stat-card, .cs-card, .cs-tech-card'
));

const STAGGER_GROUP = 4;
const STAGGER_MS    = 55;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const idx = cards.indexOf(entry.target);
    entry.target.style.transitionDelay = `${(idx % STAGGER_GROUP) * STAGGER_MS}ms`;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

cards.forEach(card => revealObserver.observe(card));

/* ===== COUNT-UP ANIMATION ===== */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCount(el, target, suffix, duration) {
  const startTime = performance.now();
  const step = (now) => {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(easeOutQuart(progress) * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-count]');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix ?? '+';
      animateCount(el, target, suffix, 1600);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));
}

/* ===== CURSOR GLOW ON DARK CARDS ===== */
document.querySelectorAll(
  '.card.dark, .cs-card.dark, .cs-stat-card.dark, .cs-tech-card.dark'
).forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--gx', `${e.clientX - r.left}px`);
    card.style.setProperty('--gy', `${e.clientY - r.top}px`);
  });
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.contact-btn, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.2;
    const y = (e.clientY - r.top  - r.height / 2) * 0.2;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ===== SKILL TAG STAGGER ON REVEAL ===== */
const skillCard = document.querySelector('.c-skills');
if (skillCard) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 30}ms`;
      });
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  skillObserver.observe(skillCard);
}

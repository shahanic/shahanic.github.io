// ── Sequential entrance animation on load ─────────────────
const heroElements = [
  '.hero-eyebrow',
  '.hero-title',
  '.hero-sub',
  '.hero-cta',
  '.hero-socials',
  '.hero-photo-wrap',
];

// Hide all hero elements instantly before first paint
heroElements.forEach(selector => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'none'; // no transition while hiding
});

// After page loads, animate them in one by one
window.addEventListener('load', () => {
  heroElements.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150 + i * 150);
  });
});

// ── Scroll fade-in for non-hero sections ───────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .section-title').forEach(el => {
  if (el.closest('.hero')) return; // skip hero elements
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── Active nav link on scroll ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#f0f0f0';
    }
  });
});

// ── Cursor glow ────────────────────────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

console.log('Shah site loaded ✓');
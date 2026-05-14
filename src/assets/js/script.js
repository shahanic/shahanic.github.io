// ── Scroll fade-in animations ──────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Add fade-up class to cards and sections
document.querySelectorAll('.glass-card, .section-title').forEach(el => {
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

// ── Smooth cursor glow effect ──────────────────────────────
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
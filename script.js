// ============================
// NAVBAR SCROLL
// ============================
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ============================
// PARTICLE CANVAS
// ============================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 55; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    o: Math.random() * 0.5 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(52,211,153,${p.o})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ============================
// SCROLL REVEAL
// ============================
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => ro.observe(el));

// ============================
// COUNTER ANIMATION
// ============================
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target % 1 !== 0 ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target);
    el.firstChild.nodeValue = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsSection = document.getElementById('stats');
let counted = false;
const so = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.querySelector('.stat-suffix');
      // Insert text node
      el.insertBefore(document.createTextNode('0'), suffix);
      el.childNodes[0].nodeValue = '0';
      animateCounter(el, target, suffix);
    });
  }
}, { threshold: 0.3 });
so.observe(statsSection);

// ============================
// FAQ
// ============================
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    closeMenuMobile();
  });
});

const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');

function closeMenuMobile() {
  if (navLinks) navLinks.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

if (burger && navLinks) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  });
}

if (overlay) {
  overlay.addEventListener('click', closeMenuMobile);
}

// ============================
// LOGO HOVER PARALLAX ON HERO
// ============================
document.getElementById('hero').addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 15;
  document.querySelector('.hero-bg').style.transform = `scale(1.06) translate(${x * 0.3}px, ${y * 0.3}px)`;
});

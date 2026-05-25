/* =========================================
   SCRIPT.JS — ESTRADAVIVA MELHORADO
========================================= */

/* =========================================
   DARK / LIGHT MODE
========================================= */
const themeToggle  = document.querySelector('.theme-toggle');
const themeIcon    = document.getElementById('theme-icon');
const themeLabel   = document.getElementById('theme-label');

// Carregar preferência salva
const savedTheme = localStorage.getItem('estradaviva-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  if (themeIcon)  themeIcon.className  = 'fas fa-moon';
  if (themeLabel) themeLabel.textContent = 'Escuro';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    if (themeIcon)  themeIcon.className  = isLight ? 'fas fa-moon' : 'fas fa-sun';
    if (themeLabel) themeLabel.textContent = isLight ? 'Escuro' : 'Claro';
    localStorage.setItem('estradaviva-theme', isLight ? 'light' : 'dark');
  });
}

/* =========================================
   MENU HAMBURGER
========================================= */
const hamburger   = document.querySelector('.hamburger');
const navLinks    = document.querySelector('.nav-links');
const navOverlay  = document.querySelector('.nav-overlay');

function closeMenu() {
  hamburger?.classList.remove('open');
  navLinks?.classList.remove('open');
  navOverlay?.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  hamburger.classList.toggle('open');
  navOverlay?.classList.toggle('show');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navOverlay?.addEventListener('click', closeMenu);

// Fechar ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* =========================================
   NAVBAR AO ROLAR
========================================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

/* =========================================
   REVEAL AO ROLAR (IntersectionObserver)
========================================= */
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .section-title, .road-card, .truck-card, .cargo-card, .stat-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left')) {
    el.classList.add('reveal');
  }
  observer.observe(el);
});

/* =========================================
   PARTÍCULAS NO HERO
========================================= */
const particlesContainer = document.querySelector('.hero-particles');

if (particlesContainer) {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left   = Math.random() * 100 + '%';
    p.style.top    = Math.random() * 100 + '%';
    p.style.width  = (Math.random() * 3 + 2) + 'px';
    p.style.height = p.style.width;
    p.style.animationDelay    = (Math.random() * 6) + 's';
    p.style.animationDuration = (Math.random() * 5 + 5) + 's';
    particlesContainer.appendChild(p);
  }
}

/* =========================================
   PARALLAX NO HERO
========================================= */
const hero = document.querySelector('.hero');

if (hero) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      hero.style.backgroundPositionY = (offset * 0.45) + 'px';
    }
  }, { passive: true });
}

/* =========================================
   CONTADOR ANIMADO DAS ESTATÍSTICAS
========================================= */
const counters = document.querySelectorAll('.stat-card h2');
let countersStarted = false;

function animateCounter(el) {
  const original = el.dataset.original || el.innerText;
  el.dataset.original = original;

  const num    = parseFloat(original.replace(/[^0-9.]/g, ''));
  const suffix = original.replace(/[0-9.]/g, '');
  const isFloat = original.includes('.');
  const duration = 1800;
  const steps    = 80;
  const interval = duration / steps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = num * eased;
    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (step >= steps) {
      clearInterval(timer);
      el.textContent = original;
    }
  }, interval);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

/* =========================================
   EFEITO 3D TILT NOS CARDS
========================================= */
const tiltCards = document.querySelectorAll('.road-card, .truck-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / 30) * -1;
    const ry = (x - cx) / 30;

    card.style.transform = `
      perspective(900px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateY(-10px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* =========================================
   GALERIA LIGHTBOX
========================================= */
const galleryImages = document.querySelectorAll('.gallery img');
let currentIndex = 0;
const imgArray = Array.from(galleryImages);

galleryImages.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.id = 'lightbox';

  lightbox.innerHTML = `
    <span class="close-lightbox" id="lb-close">&times;</span>
    <button class="lb-nav lb-prev" id="lb-prev">
      <i class="fas fa-chevron-left"></i>
    </button>
    <img src="${imgArray[currentIndex].src}" id="lb-img" alt="">
    <button class="lb-nav lb-next" id="lb-next">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .lb-nav {
      position: fixed;
      top: 50%; transform: translateY(-50%);
      background: rgba(255,107,0,0.15);
      border: 1px solid rgba(255,107,0,0.35);
      color: #fff;
      font-size: 1.4rem;
      width: 52px; height: 52px;
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, transform 0.3s;
      z-index: 10001;
    }
    .lb-nav:hover { background: rgba(255,107,0,0.5); }
    .lb-prev { left: 30px; }
    .lb-next { right: 30px; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
  document.getElementById('lb-next').addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', lbKeyHandler);
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + imgArray.length) % imgArray.length;
  const lbImg = document.getElementById('lb-img');
  if (lbImg) {
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
      lbImg.src = imgArray[currentIndex].src;
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
      lbImg.style.transition = 'all 0.3s ease';
    }, 180);
  }
}

function closeLightbox() {
  document.getElementById('lightbox')?.remove();
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', lbKeyHandler);
}

function lbKeyHandler(e) {
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'Escape')     closeLightbox();
}

/* =========================================
   SMOOTH SCROLL EM ÂNCORAS
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================================
   ACTIVE LINK BASEADO NA PÁGINA ATUAL
========================================= */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.style.color = 'var(--orange)';
    link.style.fontWeight = '700';
  }
});

/* =========================================
   CONSOLE
========================================= */
console.log(`%c
 ██████████████████████████████
 ██  ESTRADAVIVA  🇧🇷  2026  ██
 ██████████████████████████████
`, 'color: #ff6b00; font-size: 12px;');
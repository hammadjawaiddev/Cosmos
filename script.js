/* ═══════════════════════════════════════════
   COSMOS INTERSTELLAR — script.js v2.0
   ═══════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════ */
// (function initLoader() {
//   const loader = document.getElementById('loader');
//   const loaderCanvas = document.getElementById('loader-stars');
//   const loaderStatus = document.getElementById('loaderStatus');
//   const loaderFill = document.getElementById('loaderFill');

//   // Mini starfield on loader
//   const lctx = loaderCanvas.getContext('2d');
//   loaderCanvas.width = window.innerWidth;
//   loaderCanvas.height = window.innerHeight;

//   const lStars = Array.from({ length: 200 }, () => ({
//     x: Math.random() * loaderCanvas.width,
//     y: Math.random() * loaderCanvas.height,
//     r: Math.random() * 1.2 + 0.2,
//     a: Math.random(),
//     speed: Math.random() * 0.015 + 0.005,
//     offset: Math.random() * Math.PI * 2,
//   }));

//   let lt = 0;
//   function drawLoaderStars() {
//     lctx.clearRect(0, 0, loaderCanvas.width, loaderCanvas.height);
//     lStars.forEach(s => {
//       const alpha = 0.3 + Math.sin(lt * s.speed + s.offset) * 0.3;
//       lctx.beginPath();
//       lctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
//       lctx.fillStyle = `rgba(200,220,255,${alpha})`;
//       lctx.fill();
//     });
//     lt++;
//     if (!loaderDone) requestAnimationFrame(drawLoaderStars);
//   }
//   drawLoaderStars();

//   // Status messages
//   const statusMessages = [
//     'Calibrating deep-space sensors…',
//     'Mapping stellar coordinates…',
//     'Loading Hubble imagery…',
//     'Computing gravitational fields…',
//     'Entering the cosmos…',
//   ];

//   let msgIdx = 0;
//   let progress = 0;
//   let loaderDone = false;

//   function advanceLoader() {
//     if (msgIdx < statusMessages.length) {
//       loaderStatus.style.opacity = '0';
//       setTimeout(() => {
//         loaderStatus.textContent = statusMessages[msgIdx++];
//         loaderStatus.style.opacity = '1';
//       }, 200);
//     }
//     progress = Math.min(100, progress + (100 / statusMessages.length));
//     loaderFill.style.width = progress + '%';
//   }

//   advanceLoader();
//   const statusInterval = setInterval(advanceLoader, 500);

//   // Dismiss after content loads
//   function dismissLoader() {
//     clearInterval(statusInterval);
//     loaderDone = true;
//     loaderStatus.textContent = 'Mission ready. ✦';
//     loaderFill.style.width = '100%';
//     setTimeout(() => {
//       loader.classList.add('fade-out');
//       setTimeout(() => { loader.style.display = 'none'; }, 900);
//     }, 600);
//   }

//   if (document.readyState === 'complete') {
//     setTimeout(dismissLoader, 2000);
//   } else {
//     window.addEventListener('load', () => setTimeout(dismissLoader, 1500));
//     // Fallback – never block > 3.5s
//     setTimeout(dismissLoader, 3500);
//   }
// })();

(function initLoader() {
  function dismissLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('fade-out');
    setTimeout(function() {
      loader.style.display = 'none';
    }, 750);
  }
  // Always fires after 2.5 s — no dependency on images or network
  setTimeout(dismissLoader, 2500);
})();

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

function addCursorHover(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorRing.classList.remove('hover');
    });
  });
}

addCursorHover('a, button, .planet-card, .feature-card, .theory-card, .galaxy-type-card, .bh-info-card, .showcase-item');

/* ══════════════════════════════════════
   STARFIELD CANVAS
══════════════════════════════════════ */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const STAR_COUNT = 400;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() ** 2 * 2 + 0.2,
  baseAlpha: Math.random() * 0.75 + 0.1,
  twinkleAmp: Math.random() * 0.35,
  twinkleFreq: Math.random() * 0.025 + 0.005,
  phase: Math.random() * Math.PI * 2,
  color: (() => {
    const r = Math.random();
    if (r < 0.08) return [168, 216, 255];  // blue-white
    if (r < 0.15) return [255, 235, 180];  // warm
    if (r < 0.19) return [255, 190, 190];  // reddish
    return [230, 240, 255];
  })(),
}));

// Shooting stars
const shooters = [];
function spawnShooter() {
  if (Math.random() < 0.65) {
    shooters.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.55,
      vx: Math.random() * 5 + 4,
      vy: Math.random() * 2 + 0.8,
      len: Math.random() * 130 + 70,
      life: 1,
    });
  }
}
setInterval(spawnShooter, 4500);

let frame = 0;

function drawStarfield() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background nebula gradients
  const nebulas = [
    { x: canvas.width * 0.12, y: canvas.height * 0.2, r: 350, rgba: [100, 40, 220, 0.04] },
    { x: canvas.width * 0.82, y: canvas.height * 0.55, r: 280, rgba: [0, 180, 255, 0.03] },
    { x: canvas.width * 0.45, y: canvas.height * 0.88, r: 400, rgba: [180, 120, 40, 0.025] },
  ];

  nebulas.forEach(n => {
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
    const [r, gb, b, a] = n.rgba;
    g.addColorStop(0, `rgba(${r},${gb},${b},${a})`);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  // Stars
  stars.forEach(s => {
    const twinkle = Math.sin(frame * s.twinkleFreq + s.phase) * s.twinkleAmp;
    const alpha = Math.max(0.02, Math.min(1, s.baseAlpha + twinkle));
    const [r, g, b] = s.color;

    // Glow for larger stars
    if (s.size > 1) {
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
      glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.4})`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.fill();
  });

  // Shooting stars
  for (let i = shooters.length - 1; i >= 0; i--) {
    const ss = shooters[i];
    ss.x += ss.vx;
    ss.y += ss.vy;
    ss.life -= 0.018;

    if (ss.life <= 0 || ss.x > canvas.width) {
      shooters.splice(i, 1);
      continue;
    }

    const tailLen = ss.len;
    const tx = ss.x - (ss.vx / Math.sqrt(ss.vx ** 2 + ss.vy ** 2)) * tailLen;
    const ty = ss.y - (ss.vy / Math.sqrt(ss.vx ** 2 + ss.vy ** 2)) * tailLen;

    const grad = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
    grad.addColorStop(0, `rgba(0,212,255,${ss.life * 0.9})`);
    grad.addColorStop(0.2, `rgba(200,230,255,${ss.life * 0.5})`);
    grad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  frame++;
  requestAnimationFrame(drawStarfield);
}
drawStarfield();

/* ══════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════ */
const pageOrder = ['home', 'planets', 'blackholes', 'galaxies', 'universe', 'wormholes'];
let currentPageIdx = 0;

function showPage(pageName) {
  // Validate
  if (!document.getElementById('page-' + pageName)) return;

  // Fade current page out briefly
  const current = document.querySelector('.page.active');
  if (current) {
    current.style.opacity = '0';
    current.style.transition = 'opacity 0.25s';
  }

  setTimeout(() => {
    // Hide all
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.opacity = '';
      p.style.transition = '';
    });

    // Show target
    const target = document.getElementById('page-' + pageName);
    target.classList.add('active');
    target.style.opacity = '0';
    target.style.transition = 'opacity 0.4s';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { target.style.opacity = '1'; });
    });

    // Scroll to top
    window.scrollTo({ top: 0 });

    // Nav
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageName);
    });

    // Close mobile menu
    document.getElementById('navLinks').classList.remove('open');

    // Track index
    currentPageIdx = pageOrder.indexOf(pageName);
    if (currentPageIdx < 0) currentPageIdx = 0;

    // Trigger reveals
    setTimeout(triggerReveal, 120);
    setTimeout(initParallax, 50);

    // Glitch on title
    setTimeout(glitchText, 200);

  }, current ? 200 : 0);
}

/* ══════════════════════════════════════
   NAVIGATION EVENT DELEGATION
══════════════════════════════════════ */
document.addEventListener('click', e => {
  const link = e.target.closest('[data-page]');
  if (!link) return;
  e.preventDefault();
  const page = link.dataset.page;
  if (page) showPage(page);
});

// Hamburger
document.getElementById('navHamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Nav scroll state
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  triggerReveal();
  updateParallax();
}, { passive: true });

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
let revealObserver;

function triggerReveal() {
  if (revealObserver) revealObserver.disconnect();

  const elements = document.querySelectorAll('.page.active .reveal:not(.visible)');

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => revealObserver.observe(el));
}

setTimeout(triggerReveal, 400);

/* ══════════════════════════════════════
   PARALLAX
══════════════════════════════════════ */
function initParallax() {
  updateParallax();
}

function updateParallax() {
  const scrollY = window.scrollY;
  document.querySelectorAll('.page.active .parallax-bg').forEach(el => {
    el.style.transform = `scale(1.1) translateY(${scrollY * 0.25}px)`;
  });
}

// Also on hero mouse move
const homeHero = document.getElementById('homeHero');
if (homeHero) {
  homeHero.addEventListener('mousemove', e => {
    const rect = homeHero.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    const bg = homeHero.querySelector('.hero-bg');
    if (bg) {
      bg.style.transform = `scale(1.12) translate(${cx * -18}px, ${cy * -12}px)`;
    }
  });
}

initParallax();

/* ══════════════════════════════════════
   3D CARD TILT
══════════════════════════════════════ */
function initTilt() {
  document.querySelectorAll('.planet-card, .theory-card, .galaxy-type-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${cy * -5}deg) rotateY(${cx * 5}deg)`;
      card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
    });
  });
}

document.addEventListener('DOMContentLoaded', initTilt);

/* ══════════════════════════════════════
   GLITCH TEXT EFFECT
══════════════════════════════════════ */
function glitchText() {
  const els = document.querySelectorAll('.page.active .page-title, .page.active .hero-title');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦★⬡◈';

  els.forEach(el => {
    const original = el.innerText;
    let iter = 0;
    const total = original.replace(/\s/g, '').length;

    const iv = setInterval(() => {
      el.innerText = original.split('').map((ch, i) => {
        if (ch === '\n' || ch === ' ' || ch === '.') return ch;
        if (i < iter * 1.5) return ch;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      iter++;
      if (iter > total / 1.5 + 2) {
        el.innerText = original;
        clearInterval(iv);
      }
    }, 28);
  });
}

/* ══════════════════════════════════════
   SPOTIFY TOGGLE
══════════════════════════════════════ */
function toggleSpotify() {
  document.getElementById('spotifyPlayer').classList.toggle('open');
}
window.toggleSpotify = toggleSpotify;

/* ══════════════════════════════════════
   IMAGE LAZY LOAD ENHANCEMENT
══════════════════════════════════════ */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.style.transition = 'filter 0.8s ease, opacity 0.8s ease';
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
}

/* ══════════════════════════════════════
   KEYBOARD NAVIGATION
══════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    currentPageIdx = (currentPageIdx + 1) % pageOrder.length;
    showPage(pageOrder[currentPageIdx]);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    currentPageIdx = (currentPageIdx - 1 + pageOrder.length) % pageOrder.length;
    showPage(pageOrder[currentPageIdx]);
  } else if (e.key === 'Escape') {
    document.getElementById('spotifyPlayer').classList.remove('open');
    document.getElementById('navLinks').classList.remove('open');
  }
});

/* ══════════════════════════════════════
   UNIVERSE COMPOSITION BAR ANIMATION
══════════════════════════════════════ */
const compObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.comp-segment').forEach((seg, i) => {
        const targetWidth = seg.style.width;
        seg.style.width = '0%';
        setTimeout(() => {
          seg.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
          seg.style.width = targetWidth;
        }, i * 200 + 100);
      });
      compObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const compBar = document.querySelector('.composition-bar');
if (compBar) compObserver.observe(compBar);

/* ══════════════════════════════════════
   CONSOLE SIGNATURE
══════════════════════════════════════ */
console.log('%c✦ COSMOS INTERSTELLAR v2.0 ✦', 'color:#00d4ff;font-size:20px;font-family:monospace;font-weight:bold;text-shadow:0 0 10px #00d4ff');
console.log('%cBeyond Time. Beyond Gravity.', 'color:#c8a04a;font-size:12px;font-family:monospace;letter-spacing:0.2em');
console.log('%c⌨  Use ← → arrow keys to navigate pages', 'color:#7b2fff;font-size:11px;font-family:monospace');

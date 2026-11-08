/* ═══════════════════════════════════════════════════════════════════
   HASHTAG BARBERSHOP — MAIN JAVASCRIPT
   Handles: Preloader, Custom Cursor, Hero Slider, Nav, Animations
═══════════════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function padZero(n) {
  return String(n).padStart(2, '0');
}

// ─────────────────────────────────────────
// PRELOADER
// ─────────────────────────────────────────
function initPreloader() {
  const loader = $('#preloader');
  if (!loader) return;

  // Hide after fill animation (1.8s) + small buffer
  setTimeout(() => {
    loader.classList.add('hidden');
    // Remove from DOM after transition
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    // Trigger page-entry animations
    document.body.classList.add('page-loaded');
  }, 2200);
}

// ─────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────
function initCursor() {
  const cursor = $('#cursor');
  const follower = $('#cursorFollower');
  if (!cursor || !follower) return;

  // Hide default cursor
  document.documentElement.style.cursor = 'none';

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth-follow the follower
  function animateCursor() {
    followerX = lerp(followerX, mouseX, 0.12);
    followerY = lerp(followerY, mouseY, 0.12);
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    rafId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const hoverEls = $$('a, button, [data-hover], input, select, textarea, .service-card, .barber-card, .gallery__item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor--hover');
    });
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  return () => cancelAnimationFrame(rafId);
}

// ─────────────────────────────────────────
// HEADER SCROLL BEHAVIOUR
// ─────────────────────────────────────────
function initHeader() {
  const header = $('#header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        // Add scrolled glass effect
        header.classList.toggle('scrolled', lastScrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─────────────────────────────────────────
// ACTIVE NAV LINK (IntersectionObserver)
// ─────────────────────────────────────────
function initActiveNav() {
  const sections = $$('section[id], div[id]');
  const navLinks = $$('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ─────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const menu      = $('#mobileMenu');
  if (!hamburger || !menu) return;

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
    hamburger.classList.toggle('open', isOpen);
    menu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggle);

  // Close on link click
  $$('.mobile-menu__link, .mobile-menu__book', menu).forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggle();
    });
  });

  // Close on overlay click (outside nav content)
  menu.addEventListener('click', (e) => {
    if (e.target === menu && isOpen) toggle();
  });
}

// ─────────────────────────────────────────
// HERO SLIDER
// ─────────────────────────────────────────
function initHeroSlider() {
  const slides    = $$('.hero__slide');
  const dots      = $$('.hero__dot');
  const counter   = $('#slideCounterCurrent');
  const prevBtn   = $('#heroPrev');
  const nextBtn   = $('#heroNext');
  const dataEl    = $('.hero__slide-data');
  const titleLine1 = $('#heroTitleLine1');
  const titleLine2 = $('#heroTitleLine2');
  const titleLine3 = $('#heroTitleLine3');
  const eyebrow    = $('#heroEyebrow');

  if (!slides.length) return;

  let current   = 0;
  let total     = slides.length;
  let autoTimer = null;
  let isAnimating = false;

  // Parse slide title data
  let slideTitles = [];
  if (dataEl) {
    try {
      slideTitles = JSON.parse(dataEl.dataset.titles);
    } catch (e) {
      console.warn('Could not parse slide titles', e);
    }
  }

  function goTo(index, dir = 1) {
    if (isAnimating || index === current) return;
    isAnimating = true;

    // De-activate current
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');

    current = ((index % total) + total) % total;

    // Activate new
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');

    // Update counter
    if (counter) counter.textContent = padZero(current + 1);

    // Animate headline swap
    animateTitleSwap(current, dir);

    setTimeout(() => { isAnimating = false; }, 1400);
  }

  function animateTitleSwap(index, dir) {
    const data = slideTitles[index];
    if (!data || !titleLine1) return;

    const lines = [titleLine1, titleLine2, titleLine3];
    const newTexts = [data.line1, data.line2, data.line3];

    // Exit
    lines.forEach((line, i) => {
      line.style.animation = 'none';
      line.style.transform = 'translateY(0)';
      void line.offsetWidth; // force reflow
      line.style.transition = `transform 0.35s cubic-bezier(0.4,0,0.2,1) ${i * 0.04}s, opacity 0.35s ease ${i * 0.04}s`;
      line.style.opacity = '0';
      line.style.transform = dir > 0 ? 'translateY(-30px)' : 'translateY(30px)';
    });

    // Update eyebrow
    if (eyebrow) {
      eyebrow.style.opacity = '0';
      eyebrow.style.transition = 'opacity 0.3s ease';
    }

    setTimeout(() => {
      // Update text
      lines.forEach((line, i) => {
        line.textContent = newTexts[i];
      });
      if (eyebrow && data.eyebrow) {
        eyebrow.textContent = data.eyebrow;
      }

      // Enter
      lines.forEach((line, i) => {
        line.style.transform = dir > 0 ? 'translateY(30px)' : 'translateY(-30px)';
        void line.offsetWidth;
        line.style.transition = `transform 0.5s cubic-bezier(0,0,0.2,1) ${i * 0.06}s, opacity 0.5s ease ${i * 0.06}s`;
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      });

      if (eyebrow) {
        eyebrow.style.opacity = '1';
        eyebrow.style.transition = 'opacity 0.5s ease 0.1s';
      }
    }, 380);
  }

  function next() { goTo(current + 1, 1); }
  function prev() { goTo(current - 1, -1); }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5500);
  }

  function resetAuto() {
    startAuto();
  }

  // Buttons
  nextBtn?.addEventListener('click', () => { next(); resetAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); resetAuto(); });

  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i, i > current ? 1 : -1);
      resetAuto();
    });
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
  });

  // Touch / swipe
  let touchStartX = 0;
  const heroEl = $('.hero');
  heroEl?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroEl?.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
      resetAuto();
    }
  });

  startAuto();
}

// ─────────────────────────────────────────
// SCROLL REVEAL (IntersectionObserver)
// ─────────────────────────────────────────
function initScrollReveal() {
  const els = $$('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────────────────
function initCounters() {
  const stats = $$('[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseInt(el.dataset.count, 10);
      const duration = 2000;
      const start   = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = clamp(elapsed / duration, 0, 1);
        // Ease out expo
        const eased = 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

// ─────────────────────────────────────────
// TESTIMONIALS SLIDER
// ─────────────────────────────────────────
function initTestimonials() {
  const track    = $('#testiTrack');
  const prevBtn  = $('#testiPrev');
  const nextBtn  = $('#testiNext');
  if (!track) return;

  const cards    = $$('.testi-card', track);
  const isMobile = () => window.innerWidth <= 768;
  let current    = 0;
  let total      = cards.length;

  function perView() { return isMobile() ? 1 : 2; }

  function maxIndex() { return Math.max(0, total - perView()); }

  function update() {
    const pv    = perView();
    const gap   = 24;
    const wrap  = track.parentElement;
    const cardW = (wrap.offsetWidth - gap * (pv - 1)) / pv;
    const offset = current * (cardW + gap);
    track.style.transform = `translateX(-${offset}px)`;
  }

  function goNext() {
    current = Math.min(current + 1, maxIndex());
    update();
  }

  function goPrev() {
    current = Math.max(current - 1, 0);
    update();
  }

  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);

  window.addEventListener('resize', update);
  update();
}

// ─────────────────────────────────────────
// PARALLAX (subtle, only on desktop)
// ─────────────────────────────────────────
function initParallax() {
  const els = $$('[data-parallax]');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 1024) return;

  function onScroll() {
    els.forEach(wrap => {
      const img  = wrap.querySelector('.philosophy__img');
      if (!img) return;
      const rect = wrap.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset   = (progress - 0.5) * 60;
      img.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─────────────────────────────────────────
// BOOKING FORM
// ─────────────────────────────────────────
function initBookingForm() {
  const form    = $('#bookingForm');
  const success = $('#bookingSuccess');
  if (!form) return;

  // Set min date to today
  const dateInput = $('#bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name    = $('#bookName')?.value.trim();
    const phone   = $('#bookPhone')?.value.trim();
    const service = $('#bookService')?.value;
    const date    = $('#bookDate')?.value;
    const time    = $('#bookTime')?.value;

    if (!name || !phone || !service || !date || !time) {
      // Shake the empty fields
      form.querySelectorAll('.form-input:required').forEach(input => {
        if (!input.value) {
          input.style.borderColor = '#E53E3E';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });
      return;
    }

    // Simulate submission
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'SENDING...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.hidden = false;
        success.style.display = 'flex';
      }
    }, 1200);
  });
}

// ─────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─────────────────────────────────────────
// SMOOTH ANCHOR SCROLL
// ─────────────────────────────────────────
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─────────────────────────────────────────
// MARQUEE PAUSE ON HOVER
// ─────────────────────────────────────────
function initMarquee() {
  const track = $('.marquee__track');
  if (!track) return;

  track.parentElement?.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.parentElement?.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

// ─────────────────────────────────────────
// HERO DECORATIVE SVG SCENE DRAWING
// (Renders simple vector scenes when real photos are absent)
// ─────────────────────────────────────────
function initHeroDecorativeScenes() {
  // Inject subtle SVG decorative overlay patterns in the hero slides
  // These serve as atmospheric graphics beneath any real images
  const heroSlides = $$('.hero__slide');
  heroSlides.forEach((slide, i) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.15';

    if (i === 0) {
      // Slide 1: Razor silhouette
      svg.innerHTML = `
        <defs>
          <radialGradient id="glow0" cx="70%" cy="55%" r="40%">
            <stop offset="0%" stop-color="#00AEEF" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#00AEEF" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="70%" cy="55%" rx="30%" ry="25%" fill="url(#glow0)"/>
        <!-- Straight razor silhouette -->
        <g transform="translate(55%, 30%) rotate(-35, 150, 200)" opacity="0.4">
          <rect x="140" y="80" width="10" height="260" rx="2" fill="#00AEEF"/>
          <ellipse cx="145" cy="78" rx="12" ry="6" fill="#00AEEF"/>
          <rect x="130" y="336" width="30" height="80" rx="4" fill="#0077B6"/>
        </g>
        <!-- Grid lines for depth -->
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="rgba(0,174,239,0.08)" stroke-width="1"/>
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="rgba(0,174,239,0.05)" stroke-width="1"/>
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(0,174,239,0.05)" stroke-width="1"/>
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="rgba(0,174,239,0.08)" stroke-width="1"/>
      `;
    } else if (i === 1) {
      // Slide 2: Barber chair silhouette
      svg.innerHTML = `
        <defs>
          <radialGradient id="glow1" cx="35%" cy="60%" r="45%">
            <stop offset="0%" stop-color="#00AEEF" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#00AEEF" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="35%" cy="60%" rx="35%" ry="30%" fill="url(#glow1)"/>
        <!-- Chair silhouette (simplified) -->
        <g transform="translate(15%, 15%)" opacity="0.35">
          <!-- Backrest -->
          <rect x="80" y="20" width="140" height="180" rx="10" fill="#00AEEF" opacity="0.5"/>
          <!-- Seat -->
          <rect x="60" y="190" width="180" height="60" rx="8" fill="#00AEEF" opacity="0.5"/>
          <!-- Base -->
          <rect x="130" y="250" width="40" height="100" fill="#0077B6" opacity="0.5"/>
          <rect x="90" y="345" width="120" height="12" rx="4" fill="#0077B6" opacity="0.5"/>
          <!-- Footrest -->
          <rect x="40" y="300" width="80" height="20" rx="4" fill="#0077B6" opacity="0.4"/>
          <!-- Armrests -->
          <rect x="40" y="180" width="30" height="80" rx="4" fill="#0077B6" opacity="0.4"/>
          <rect x="230" y="180" width="30" height="80" rx="4" fill="#0077B6" opacity="0.4"/>
          <!-- Headrest -->
          <rect x="90" y="0" width="120" height="30" rx="8" fill="#00AEEF" opacity="0.4"/>
        </g>
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="rgba(0,174,239,0.06)" stroke-width="1"/>
      `;
    } else {
      // Slide 3: Geometric fade pattern
      svg.innerHTML = `
        <defs>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#00AEEF" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#00AEEF" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="50%" cy="50%" rx="40%" ry="40%" fill="url(#glow2)"/>
        <!-- Scissors silhouette -->
        <g transform="translate(45%, 20%) rotate(20, 50, 100)" opacity="0.3">
          <!-- Blade 1 -->
          <ellipse cx="50" cy="80" rx="6" ry="80" fill="#00AEEF"/>
          <!-- Blade 2 -->
          <ellipse cx="70" cy="80" rx="6" ry="80" fill="#00AEEF" transform="rotate(20, 60, 80)"/>
          <!-- Pivot -->
          <circle cx="60" cy="90" r="8" fill="#0077B6"/>
          <!-- Handles -->
          <ellipse cx="45" cy="175" rx="18" ry="30" fill="none" stroke="#00AEEF" stroke-width="4"/>
          <ellipse cx="78" cy="175" rx="18" ry="30" fill="none" stroke="#00AEEF" stroke-width="4" transform="rotate(15, 78, 175)"/>
        </g>
        <!-- Concentric circles -->
        <circle cx="50%" cy="50%" r="20%" fill="none" stroke="rgba(0,174,239,0.08)" stroke-width="1"/>
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="rgba(0,174,239,0.05)" stroke-width="1"/>
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(0,174,239,0.03)" stroke-width="1"/>
      `;
    }
    slide.querySelector('.hero__slide-bg')?.appendChild(svg);
  });
}

// ─────────────────────────────────────────

// ─────────────────────────────────────────
// DEALS TAB SWITCHER
// ─────────────────────────────────────────
function initDealsTabs() {
  const tabs = $$('.deal-tab-btn');
  const panels = $$('.deals__panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePanel = $('#' + target);
      if (activePanel) activePanel.classList.add('active');
    });
  });
}

// ─────────────────────────────────────────
// LIGHTBOX MODAL
// ─────────────────────────────────────────
function initLightbox() {
  const triggers = $$('[data-lightbox]');
  const modal = $('#lightboxModal');
  const img = $('#lightboxImg');
  const close = $('#lightboxClose');
  if (!modal || !img) return;

  triggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.dataset.lightbox || el.getAttribute('href') || el.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
      if (src) {
        img.src = src;
        modal.classList.add('active');
      }
    });
  });

  const closeModal = () => modal.classList.remove('active');
  close?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ─────────────────────────────────────────
// ENHANCED WHATSAPP BOOKING
// ─────────────────────────────────────────
function initWhatsAppBooking() {
  const form = $('#bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const branch  = $('#bookBranch')?.value || 'Varappuzha';
    const name    = $('#bookName')?.value || '';
    const phone   = $('#bookPhone')?.value || '';
    const service = $('#bookService')?.value || 'General Grooming';
    const date    = $('#bookDate')?.value || '';
    const time    = $('#bookTime')?.value || '';

    if (!name || !phone) return;

    const msg = `*Appointment Booking Request - My Hashtag Unisex Salon*\n` +
                `👤 *Name:* ${name}\n` +
                `📞 *Phone:* ${phone}\n` +
                `📍 *Branch:* ${branch}\n` +
                `✂️ *Service:* ${service}\n` +
                `📅 *Date:* ${date}\n` +
                `⏰ *Time:* ${time}`;

    const waUrl = `https://wa.me/918078558027?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  });
}

// ENTRY POINT
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initHeader();
  initActiveNav();
  initMobileMenu();
  initHeroSlider();
  initScrollReveal();
  initCounters();
  initTestimonials();
  initParallax();
  initBookingForm();
  initDealsTabs();
  initLightbox();
  initWhatsAppBooking();
  initBackToTop();
  initSmoothScroll();
  initMarquee();
  initHeroDecorativeScenes();
});


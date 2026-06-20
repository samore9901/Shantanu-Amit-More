// Shantanu More — Portfolio interactions

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const navLinkItems = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('main section[id]');
  const yearEl = document.getElementById('year');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav background on scroll
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.textContent = isOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.textContent = '☰';
      });
    });
  }

  // Active link highlighting
  if ('IntersectionObserver' in window && sections.length) {
    const navMap = {};
    navLinkItems.forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) navMap[href.slice(1)] = a;
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinkItems.forEach(a => a.classList.remove('is-active'));
          const link = navMap[entry.target.id];
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => ro.observe(el));
  }

  // Project accordions
  const projHeads = document.querySelectorAll('.proj-head');
  projHeads.forEach(head => {
    head.addEventListener('click', () => {
      const card = head.closest('.proj-card');
      const wasOpen = card.classList.contains('is-open');
      card.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(!wasOpen));
    });
    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.setAttribute('aria-expanded', 'false');
    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        head.click();
      }
    });
  });

  // Open the first project card by default
  const firstCard = document.querySelector('.proj-card');
  if (firstCard) {
    firstCard.classList.add('is-open');
    firstCard.querySelector('.proj-head').setAttribute('aria-expanded', 'true');
  }
});

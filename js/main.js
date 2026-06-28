(function () {
  const nav = document.getElementById('site-nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky nav shadow on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });
})();

// Scroll-reveal animation
(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length || !window.IntersectionObserver) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(function (el) { observer.observe(el); });
})();

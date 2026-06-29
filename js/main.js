/* ════════════════════════════════════════════════════════════════
   Nav, mobile menu, and premium pointer micro-interactions
═══════════════════════════════════════════════════════════════════ */
/* Safety net: guarantee the hero content is revealed even if the
   hero-scroll module or GSAP CDN never runs. */
window.addEventListener('load', function () {
  document.body.classList.add('is-loaded');
});

(function () {
  var nav = document.getElementById('site-nav');
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  /* ---------- sticky nav shadow ---------- */
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  if (hamburger && mobileMenu) {
    var openMenu = function () {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    };
    var closeMenu = function () {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    };
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }
})();

/* ════════════════════════════════════════════════════════════════
   Pointer micro-interactions — only where hover + fine pointer exist
   and motion is allowed. Touch and reduced-motion users get the
   clean static design with no JS-driven movement.
═══════════════════════════════════════════════════════════════════ */
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  /* ---------- mouse-follow glow on service rows ---------- */
  document.querySelectorAll('.service-item').forEach(function (row) {
    row.addEventListener('pointermove', function (e) {
      var r = row.getBoundingClientRect();
      row.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      row.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 3D tilt on gallery tiles ---------- */
  var TILT = 6; // max degrees
  document.querySelectorAll('.gallery-item').forEach(function (tile) {
    var raf = null;
    tile.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = tile.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tile.style.transform =
          'perspective(900px) rotateY(' + (px * TILT) + 'deg) rotateX(' +
          (-py * TILT) + 'deg) translateZ(0)';
      });
    });
    tile.addEventListener('pointerleave', function () {
      tile.style.transform = '';
    });
  });

  /* ---------- magnetic primary buttons ----------
     Measure the resting rect ONCE on enter (no transform applied yet) and
     pull from that fixed centre. Measuring during pointermove would read
     the already-translated position and feed back into itself — that was
     the jitter/run-away bug. Travel is rAF-throttled and clamped. */
  var PULL = 0.34;
  var MAX = 16; // px — button never drifts further than this from rest
  document.querySelectorAll('.btn-primary').forEach(function (btn) {
    var base = null;
    var raf = null;

    btn.addEventListener('pointerenter', function () {
      base = btn.getBoundingClientRect();
    });

    btn.addEventListener('pointermove', function (e) {
      if (!base) base = btn.getBoundingClientRect();
      if (raf) return;
      var cx = e.clientX, cy = e.clientY;
      raf = requestAnimationFrame(function () {
        raf = null;
        var dx = (cx - (base.left + base.width / 2)) * PULL;
        var dy = (cy - (base.top + base.height / 2)) * PULL;
        dx = Math.max(-MAX, Math.min(MAX, dx));
        dy = Math.max(-MAX, Math.min(MAX, dy));
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
    });

    btn.addEventListener('pointerleave', function () {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      btn.style.transform = '';
      base = null;
    });
  });
})();

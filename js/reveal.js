/* ════════════════════════════════════════════════════════════════
   Scroll reveals + animated dividers
   Uses GSAP ScrollTrigger when present (staggered, eased), and falls
   back to IntersectionObserver so content always appears.
═══════════════════════════════════════════════════════════════════ */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  var dividers = [].slice.call(document.querySelectorAll('.divider-line'));

  if (reduce) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
    dividers.forEach(function (el) { el.classList.add('drawn'); });
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    reveals.forEach(function (el) {
      var delay = 0;
      if (el.classList.contains('reveal-delay')) delay = 0.12;
      if (el.classList.contains('reveal-delay-2')) delay = 0.24;
      gsap.fromTo(el,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, delay: delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        }
      );
    });

    dividers.forEach(function (el) {
      gsap.fromTo(el,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        }
      );
    });
    return;
  }

  /* ---------- IntersectionObserver fallback ---------- */
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
    dividers.forEach(function (el) { el.classList.add('drawn'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'drawn');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.concat(dividers).forEach(function (el) { io.observe(el); });
})();

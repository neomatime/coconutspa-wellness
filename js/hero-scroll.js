/* ════════════════════════════════════════════════════════════════
   Cinematic video hero
   The hero video is fixed to the viewport. As the user scrolls it zooms
   in (scroll-driven, GPU transform) as though moving into the scene.
   Once max zoom is reached the page content rises and slides over the
   held video. Degrades gracefully without GSAP and respects reduced
   motion. Performance: only transform: scale() — no layout work.
═══════════════════════════════════════════════════════════════════ */
(function () {
  var hero = document.querySelector('.hero');
  var video = document.querySelector('.hero-video');
  var heroContent = hero ? hero.querySelector('.hero-content') : null;
  var scrollCue = hero ? hero.querySelector('.hero-scroll-cue') : null;
  var loader = document.getElementById('site-loader');
  var loaderFill = document.getElementById('loader-fill');

  function reveal() { document.body.classList.add('is-loaded'); }

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('is-hidden');
    window.setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 900);
  }

  if (!hero || !video) {
    reveal();
    hideLoader();
    return;
  }

  var MAX_SCALE = 1.34;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setScale(s) {
    video.style.transform = 'translateZ(0) scale(' + s + ')';
  }

  function playVideo() {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* ---------- readiness / loader ---------- */
  var ready = false;
  function onReady() {
    if (ready) return;
    ready = true;
    if (loaderFill) loaderFill.style.transform = 'scaleX(1)';
    reveal();
    hideLoader();
    playVideo();
  }

  video.addEventListener('loadeddata', onReady);
  video.addEventListener('canplay', onReady);
  video.addEventListener('progress', function () {
    if (loaderFill && video.duration && video.buffered.length) {
      var pct = Math.min(video.buffered.end(video.buffered.length - 1) / video.duration, 1);
      loaderFill.style.transform = 'scaleX(' + pct + ')';
    }
  });
  if (video.readyState >= 2) onReady();
  // never trap the user behind the loader if the video is slow
  window.setTimeout(onReady, 4000);

  /* ---------- reduced motion: no scroll zoom ---------- */
  if (reduceMotion) {
    setScale(1);
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-scrubbed zoom over the first viewport of scrolling. scrub adds
    // the subtle easing/lag so there are no abrupt jumps.
    ScrollTrigger.create({
      start: 0,
      end: function () { return window.innerHeight; },
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        var p = self.progress;
        setScale(1 + p * (MAX_SCALE - 1));
        // gently fade the headline as we push into the scene
        var fade = 1 - Math.min(p * 1.15, 1);
        if (heroContent) heroContent.style.opacity = String(fade);
        if (scrollCue) scrollCue.style.opacity = String(1 - Math.min(p * 2, 1));
      }
    });

    // Pause the video once the content has fully covered it (saves the GPU
    // decoding a 4K frame behind opaque content); resume when it returns.
    ScrollTrigger.create({
      start: function () { return window.innerHeight * 2; },
      end: 'max',
      onEnter: function () { video.pause(); },
      onLeaveBack: playVideo
    });

    window.addEventListener('resize', function () { ScrollTrigger.refresh(); });
  } else {
    /* ---------- no GSAP: lightweight rAF scroll zoom ---------- */
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight || 1;
      var p = Math.min(Math.max(window.scrollY / vh, 0), 1);
      setScale(1 + p * (MAX_SCALE - 1));
      if (heroContent) heroContent.style.opacity = String(1 - Math.min(p * 1.15, 1));
      if (scrollCue) scrollCue.style.opacity = String(1 - Math.min(p * 2, 1));
      // pause/resume for performance
      if (window.scrollY > vh * 2) { if (!video.paused) video.pause(); }
      else if (video.paused) { playVideo(); }
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();

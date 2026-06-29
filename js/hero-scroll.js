/* ════════════════════════════════════════════════════════════════
   Cinematic scroll-scrub hero
   Apple-style canvas image sequence driven by GSAP ScrollTrigger.
   201 frames are scrubbed by scroll while the hero is pinned, then
   the final frames zoom + darken as the page content rises over it.
   Falls back to a static cover image on mobile or reduced-motion.
═══════════════════════════════════════════════════════════════════ */
(function () {
  var hero = document.querySelector('.hero');
  var canvas = document.querySelector('.hero-canvas');
  var loader = document.getElementById('site-loader');
  var loaderFill = document.getElementById('loader-fill');
  if (!hero || !canvas) {
    document.body.classList.add('is-loaded');
    if (loader) loader.classList.add('is-hidden');
    return;
  }

  var FRAME_COUNT = 201;
  var framePath = function (i) {
    var n = ('00' + i).slice(-3);
    return 'assets/images/hero-scroll/ezgif-frame-' + n + '.jpg';
  };

  // Black letterbox bars are baked into the source frames — crop them out.
  var CROP = 0.11;

  var ctx = canvas.getContext('2d', { alpha: false });
  var images = new Array(FRAME_COUNT);
  var loaded = 0;
  var proxy = { frame: 0 };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var smallScreen = window.matchMedia('(max-width: 900px)').matches;
  var noTrigger = typeof window.gsap === 'undefined' ||
                  typeof window.ScrollTrigger === 'undefined';
  var staticMode = reduceMotion || smallScreen || noTrigger;

  /* ---------- canvas sizing (DPR-aware) ---------- */
  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  /* ---------- draw one frame, cover-fit, bars cropped ---------- */
  function draw(index) {
    var img = images[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    var cw = canvas.width, ch = canvas.height;
    var sx = 0;
    var sy = img.naturalHeight * CROP;
    var sw = img.naturalWidth;
    var sh = img.naturalHeight * (1 - CROP * 2);
    var scale = Math.max(cw / sw, ch / sh);
    var dw = sw * scale, dh = sh * scale;
    var dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  function render() {
    var i = Math.round(proxy.frame);
    if (i < 0) i = 0;
    if (i > FRAME_COUNT - 1) i = FRAME_COUNT - 1;
    draw(i);
  }

  /* ---------- preload with progress ---------- */
  function preload() {
    for (var i = 0; i < FRAME_COUNT; i++) {
      (function (idx) {
        var img = new Image();
        img.onload = img.onerror = function () {
          loaded++;
          if (loaderFill) {
            loaderFill.style.transform = 'scaleX(' + (loaded / FRAME_COUNT) + ')';
          }
          if (idx === 0) { sizeCanvas(); render(); }
          if (loaded === FRAME_COUNT) onReady();
        };
        img.src = framePath(idx + 1);
        images[idx] = img;
      })(i);
    }
  }

  /* ---------- loader fade ---------- */
  function hideLoader() {
    if (!loader) return;
    loader.classList.add('is-hidden');
    window.setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 900);
  }

  var ready = false;
  function onReady() {
    if (ready) return;
    ready = true;
    sizeCanvas();
    render();
    if (!staticMode) initScrollScrub();
    else initStatic();
    hideLoader();
    document.body.classList.add('is-loaded');
  }

  /* ---------- static fallback (mobile / reduced motion) ---------- */
  function initStatic() {
    hero.classList.add('hero--static');
    // Show a frame from the middle of the push-in for a fuller composition.
    proxy.frame = Math.round(FRAME_COUNT * 0.5);
    render();
    window.addEventListener('resize', function () { sizeCanvas(); render(); });
  }

  /* ---------- scroll-scrub (desktop) ---------- */
  function initScrollScrub() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    var SCRUB_DUR = 8;   // share of timeline spent scrubbing frames
    var OUTRO_DUR = 2.4; // share spent on the zoom/darken handoff

    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=2600',
        pin: '.hero-sticky',
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Phase 1 — scrub through the frames
    tl.to(proxy, {
      frame: FRAME_COUNT - 1,
      duration: SCRUB_DUR,
      onUpdate: render
    }, 0);

    // Phase 2 — cinematic handoff: push in, darken, lift content away
    tl.to(canvas, { scale: 1.16, ease: 'power1.in', duration: OUTRO_DUR }, SCRUB_DUR);
    tl.to('.hero-overlay', { opacity: 1, ease: 'power1.in', duration: OUTRO_DUR }, SCRUB_DUR);
    tl.to('.hero-content', { y: -70, opacity: 0, ease: 'power1.in', duration: OUTRO_DUR * 0.9 }, SCRUB_DUR);
    tl.to('.hero-scroll-cue', { opacity: 0, duration: 1 }, 0);

    window.addEventListener('resize', function () {
      sizeCanvas();
      render();
    });

    ScrollTrigger.refresh();
  }

  /* ---------- go ---------- */
  // Safety: never trap the user behind the loader if something stalls.
  window.setTimeout(function () { if (!ready) onReady(); }, 9000);
  preload();
})();

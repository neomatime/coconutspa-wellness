# Coconut Spa & Wellness Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrolling website for Coconut Spa & Wellness with 9 sections: Nav, Hero, About, Services, Amenities, Gallery, Reviews, Booking/Contact, and Footer.

**Architecture:** Pure HTML/CSS/JS — no framework. CSS custom properties drive all design tokens (colors, typography, spacing). Sections are built incrementally, each in its own task, with visual verification after each one. JavaScript handles sticky nav shadow, mobile hamburger menu, and smooth scroll.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS, Balimo font (local @font-face), Great Vibes (Google Fonts CDN), AVIF images with `<picture>` fallback.

## Global Constraints

- All colors must match the approved palette: `#F5EDD8` (cream), `#C9A84C` (brand gold), `#2C1A0E` (espresso), `#FDFAF4` (warm white), `#7A5C3A` (warm teak)
- Font stack: Balimo Bold/Regular (local) for all text; Great Vibes for script accents
- Balimo font files are in `assets/font/` — do not move or rename them
- Images are in `assets/images/` as AVIF — always wrap in `<picture>` with a JPEG fallback `<img>` (JPEG fallbacks can be omitted for now with a TODO comment since we only have AVIF)
- Booking CTA must link to: `https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe`
- All sections must be reachable via anchor links matching nav: `#services`, `#about`, `#gallery`, `#contact`
- Mobile breakpoint: 768px. Tablet: 1024px.
- No external CSS frameworks (no Bootstrap, Tailwind, etc.)
- Smooth scroll: `scroll-behavior: smooth` on `html` element

---

## File Map

```
coconurspawellness-site/
├── index.html                        ← single HTML file, all sections
├── css/
│   ├── tokens.css                    ← CSS custom properties only
│   ├── base.css                      ← reset, font-face, body, typography helpers
│   └── main.css                      ← all section styles + responsive
├── js/
│   └── main.js                       ← sticky nav, mobile menu, smooth scroll
└── assets/
    ├── font/                         ← already present, do not touch
    │   ├── Balimo-Regular.ttf/.otf
    │   └── Balimo-Bold.ttf/.otf
    └── images/                       ← already present, do not touch
        ├── ad362096-...-Fresha.avif  ← hero image
        ├── d4eb3c8c-...-Fresha.avif  ← gallery image 1
        └── dd391bee-...-Fresha.avif  ← gallery image 2
```

---

## Task 1: Project Scaffold — Tokens, Base Styles, HTML Shell

**Files:**
- Create: `css/tokens.css`
- Create: `css/base.css`
- Create: `css/main.css` (empty placeholder)
- Create: `js/main.js` (empty placeholder)
- Modify: `index.html` (replace empty file with full shell)

**Interfaces:**
- Produces: CSS custom properties consumed by all later tasks; `index.html` shell with section anchors that all later tasks fill in

- [ ] **Step 1: Create `css/tokens.css`**

```css
:root {
  --color-cream: #F5EDD8;
  --color-gold: #C9A84C;
  --color-espresso: #2C1A0E;
  --color-warm-white: #FDFAF4;
  --color-teak: #7A5C3A;
  --color-cream-dark: #EFE5CC;

  --font-primary: 'Balimo', Georgia, serif;
  --font-script: 'Great Vibes', cursive;

  --radius-card: 12px;
  --radius-btn: 6px;

  --max-width: 1200px;
  --section-pad: 5rem 1.5rem;
  --section-pad-mobile: 3rem 1.25rem;
}
```

- [ ] **Step 2: Create `css/base.css`**

```css
@font-face {
  font-family: 'Balimo';
  src: url('../assets/font/Balimo-Regular.otf') format('opentype'),
       url('../assets/font/Balimo-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Balimo';
  src: url('../assets/font/Balimo-Bold.otf') format('opentype'),
       url('../assets/font/Balimo-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-teak);
  background-color: var(--color-cream);
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-script {
  font-family: var(--font-script);
  font-size: 2rem;
  color: var(--color-gold);
  display: block;
  margin-bottom: 0.25rem;
}

.btn-primary {
  display: inline-block;
  background-color: var(--color-gold);
  color: var(--color-espresso);
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-btn);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.88;
}

.btn-ghost {
  display: inline-block;
  background-color: transparent;
  color: var(--color-warm-white);
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-btn);
  border: 1.5px solid var(--color-warm-white);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-ghost:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

- [ ] **Step 3: Create `css/main.css`** (empty — sections will be added per task)

```css
/* Section styles added per task */
```

- [ ] **Step 4: Create `js/main.js`** (empty — JS added in Task 11)

```js
/* JS added in Task 11 */
```

- [ ] **Step 5: Write `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coconut Wellness Spa — Midrand</title>
  <meta name="description" content="Coconut Spa & Wellness in Midrand, Gauteng. Massage, skin therapy, body treatments, couples packages, birthday packages, pool and sauna. Book online via Fresha." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/base.css" />
  <link rel="stylesheet" href="css/main.css" />
</head>
<body>

  <!-- NAV -->
  <header class="site-nav" id="site-nav">
    <!-- Task 2 -->
  </header>

  <main>

    <!-- HERO -->
    <section class="hero" id="home">
      <!-- Task 3 -->
    </section>

    <!-- ABOUT -->
    <section class="about" id="about">
      <!-- Task 4 -->
    </section>

    <!-- SERVICES -->
    <section class="services" id="services">
      <!-- Task 5 -->
    </section>

    <!-- AMENITIES -->
    <section class="amenities" id="amenities">
      <!-- Task 6 -->
    </section>

    <!-- GALLERY -->
    <section class="gallery" id="gallery">
      <!-- Task 7 -->
    </section>

    <!-- REVIEWS -->
    <section class="reviews" id="reviews">
      <!-- Task 8 -->
    </section>

    <!-- CONTACT -->
    <section class="contact" id="contact">
      <!-- Task 9 -->
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <!-- Task 10 -->
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 6: Open `index.html` in a browser and verify it loads without errors** (blank cream page — that's correct at this stage)

- [ ] **Step 7: Commit**

```bash
git add index.html css/tokens.css css/base.css css/main.css js/main.js
git commit -m "feat: project scaffold — tokens, base styles, html shell"
```

---

## Task 2: Navigation

**Files:**
- Modify: `index.html` — fill in `<header class="site-nav">` content
- Modify: `css/main.css` — add nav styles

**Interfaces:**
- Consumes: `--color-cream`, `--color-espresso`, `--color-gold`, `--font-primary`, `.btn-primary`, `.container` from Task 1
- Produces: `<header class="site-nav">` with class `.is-scrolled` toggled by Task 11 JS

- [ ] **Step 1: Add nav HTML inside `<header class="site-nav" id="site-nav">`**

```html
<div class="container nav-inner">
  <nav class="nav-links" aria-label="Primary navigation">
    <a href="#services">Services</a>
    <a href="#about">About</a>
    <a href="#gallery">Gallery</a>
    <a href="#contact">Contact</a>
  </nav>
  <a href="#home" class="nav-logo" aria-label="Coconut Wellness Spa — home">
    <span class="nav-logo-name">COCONUT</span>
    <span class="nav-logo-script">Wellness Spa</span>
  </a>
  <div class="nav-actions">
    <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
       class="btn-primary" target="_blank" rel="noopener">Book Now</a>
    <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</div>
<nav class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#gallery">Gallery</a>
  <a href="#contact">Contact</a>
  <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
     class="btn-primary" target="_blank" rel="noopener">Book Now</a>
</nav>
```

- [ ] **Step 2: Add nav styles to `css/main.css`**

```css
/* ── NAV ─────────────────────────────────────── */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-cream);
  border-bottom: 1.5px solid var(--color-gold);
  transition: box-shadow 0.2s ease;
}

.site-nav.is-scrolled {
  box-shadow: 0 2px 16px rgba(44, 26, 14, 0.1);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--color-espresso);
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--color-gold);
}

.nav-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  gap: 2px;
}

.nav-logo-name {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.2em;
  color: var(--color-espresso);
}

.nav-logo-script {
  font-family: var(--font-script);
  font-size: 1.1rem;
  color: var(--color-gold);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-espresso);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background-color: var(--color-cream);
  border-top: 1px solid rgba(201, 168, 76, 0.3);
}

.mobile-menu a {
  font-size: 14px;
  letter-spacing: 0.08em;
  color: var(--color-espresso);
}

.mobile-menu.is-open {
  display: flex;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
  .nav-inner { height: 60px; }
}
```

- [ ] **Step 3: Open in browser — verify nav renders with cream background, gold bottom border, centered logo, links left, Book Now button right**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: navigation — sticky bar, logo, links, mobile hamburger"
```

---

## Task 3: Hero Section

**Files:**
- Modify: `index.html` — fill in `<section class="hero">`
- Modify: `css/main.css` — add hero styles

**Interfaces:**
- Consumes: `--color-espresso`, `--color-gold`, `--color-warm-white`, `--font-primary`, `--font-script`, `.btn-primary`, `.btn-ghost`, `.container` from Task 1
- Produces: full-bleed hero visible at page load; `.hero` section with `id="home"`

- [ ] **Step 1: Add hero HTML inside `<section class="hero" id="home">`**

```html
<picture>
  <source srcset="assets/images/ad362096-e85c-44d1-9d95-55182be72e94-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif" type="image/avif" />
  <img
    src="assets/images/ad362096-e85c-44d1-9d95-55182be72e94-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif"
    alt="Coconut Spa & Wellness interior — a serene treatment space"
    class="hero-bg"
    loading="eager"
    fetchpriority="high"
  />
</picture>
<div class="hero-overlay"></div>
<div class="hero-content container">
  <span class="section-script">Welcome to</span>
  <h1 class="hero-heading">Coconut<br>Wellness Spa</h1>
  <p class="hero-tagline">Where your body feels as fresh and smooth as a coconut</p>
  <div class="hero-btns">
    <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
       class="btn-primary" target="_blank" rel="noopener">Book an Appointment</a>
    <a href="#services" class="btn-ghost">Explore Services</a>
  </div>
</div>
```

- [ ] **Step 2: Add hero styles to `css/main.css`**

```css
/* ── HERO ────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(44, 26, 14, 0.58);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.hero-content .section-script {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.hero-heading {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1.05;
  color: var(--color-warm-white);
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
}

.hero-tagline {
  font-size: 1.1rem;
  color: rgba(253, 250, 244, 0.8);
  max-width: 480px;
  margin: 0 auto 2.25rem;
}

.hero-btns {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero { min-height: 85vh; }
  .hero-heading { font-size: 2.5rem; }
}
```

- [ ] **Step 3: Open in browser — verify full-bleed photo with dark overlay, script "Welcome to" in gold, large white heading, two buttons**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: hero section — full-bleed photo, overlay, headline, CTAs"
```

---

## Task 4: About Section

**Files:**
- Modify: `index.html` — fill in `<section class="about">`
- Modify: `css/main.css` — add about styles

**Interfaces:**
- Consumes: `--color-cream`, `--color-espresso`, `--color-gold`, `--color-teak`, `--font-primary`, `--font-script`, `.container`, `.section-script` from Task 1

- [ ] **Step 1: Add about HTML inside `<section class="about" id="about">`**

```html
<div class="container about-inner">
  <div class="about-left">
    <span class="section-script">Our Story</span>
    <blockquote class="about-quote">
      "Your body deserves to feel as fresh and smooth as a coconut."
    </blockquote>
  </div>
  <div class="about-right">
    <p>Located at the heart of Midrand, Glen Austin, we are a full-service wellness spa dedicated to making you feel completely restored — from the moment you arrive to the moment you leave.</p>
    <p>We offer a comprehensive range of treatments, from therapeutic massages and rejuvenating facials to couple escapes and birthday packages — all delivered by our team of skilled, caring therapists using premium, organic products.</p>
    <p>Open every day of the week, we are here whenever you need to pause, reset, and treat yourself.</p>
    <div class="about-rating">
      <div class="about-stars" aria-label="4.8 out of 5 stars">
        ★★★★★
      </div>
      <p class="about-rating-text"><strong>4.8</strong> from 697 verified reviews on Fresha</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add about styles to `css/main.css`**

```css
/* ── ABOUT ───────────────────────────────────── */
.about {
  padding: var(--section-pad);
  background-color: var(--color-cream);
}

.about-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-quote {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: var(--color-espresso);
  line-height: 1.3;
  border: none;
  padding: 0;
  font-style: normal;
}

.about-right p {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--color-teak);
}

.about-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background-color: var(--color-warm-white);
  border-radius: var(--radius-card);
  border-left: 4px solid var(--color-gold);
}

.about-stars {
  font-size: 1.2rem;
  color: var(--color-gold);
  letter-spacing: 2px;
}

.about-rating-text {
  font-size: 0.875rem;
  color: var(--color-teak);
  margin: 0;
}

.about-rating-text strong {
  color: var(--color-espresso);
  font-weight: 700;
}

@media (max-width: 1024px) {
  .about-inner { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .about { padding: var(--section-pad-mobile); }
}
```

- [ ] **Step 3: Open in browser — verify two-column layout, large pull quote left, body copy + rating badge right**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: about section — pull quote, body copy, rating badge"
```

---

## Task 5: Services Section

**Files:**
- Modify: `index.html` — fill in `<section class="services">`
- Modify: `css/main.css` — add services styles

**Interfaces:**
- Consumes: `--color-warm-white`, `--color-espresso`, `--color-gold`, `--color-teak`, `--radius-card`, `.container`, `.section-script` from Task 1

- [ ] **Step 1: Add services HTML inside `<section class="services" id="services">`**

```html
<div class="container">
  <div class="section-header">
    <span class="section-script">What We Offer</span>
    <h2 class="section-heading">Our Services</h2>
  </div>
  <div class="services-grid">

    <div class="service-card">
      <div class="service-icon">💆</div>
      <h3 class="service-name">Massage Therapy</h3>
      <p class="service-desc">Swedish, deep tissue, back & shoulder, and full-body massages tailored to your needs.</p>
      <span class="service-price">From R300</span>
    </div>

    <div class="service-card">
      <div class="service-icon">✨</div>
      <h3 class="service-name">Skin Therapy</h3>
      <p class="service-desc">Revitalising facials and advanced skin treatments using organic products.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">🌿</div>
      <h3 class="service-name">Body Therapy</h3>
      <p class="service-desc">Full-body scrubs, wraps, and treatments that leave your skin glowing.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">💅</div>
      <h3 class="service-name">Hands & Feet</h3>
      <p class="service-desc">Manicures, pedicures, and nail treatments for perfectly polished results.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">🧖</div>
      <h3 class="service-name">Waxing & Tinting</h3>
      <p class="service-desc">Professional waxing and brow/lash tinting services.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">🌙</div>
      <h3 class="service-name">Wellness Therapy</h3>
      <p class="service-desc">Holistic wellness treatments to restore balance and calm.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">❤️</div>
      <h3 class="service-name">Couple Therapy</h3>
      <p class="service-desc">Soulmate Escape and couple packages — side-by-side relaxation for two.</p>
      <span class="service-price">From R1,350</span>
    </div>

    <div class="service-card">
      <div class="service-icon">🎂</div>
      <h3 class="service-name">Birthday Packages</h3>
      <p class="service-desc">Celebrate in style with curated spa packages for birthdays and special occasions.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">🏊</div>
      <h3 class="service-name">Pool Access</h3>
      <p class="service-desc">Enjoy our on-site swimming pool — the perfect way to unwind before or after a treatment.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

    <div class="service-card">
      <div class="service-icon">🛁</div>
      <h3 class="service-name">Spa Facilities</h3>
      <p class="service-desc">Access to our sauna, showers, lockers, and relaxation lounge.</p>
      <span class="service-price">Contact for pricing</span>
    </div>

  </div>
  <div class="services-cta">
    <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
       class="btn-primary" target="_blank" rel="noopener">View All & Book on Fresha</a>
  </div>
</div>
```

- [ ] **Step 2: Add services styles to `css/main.css`**

```css
/* ── SERVICES ────────────────────────────────── */
.services {
  padding: var(--section-pad);
  background-color: var(--color-warm-white);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-heading {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: var(--color-espresso);
  line-height: 1.2;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.service-card {
  background-color: var(--color-warm-white);
  border: 1px solid rgba(201, 168, 76, 0.25);
  border-radius: var(--radius-card);
  padding: 1.5rem 1.25rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.service-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.service-name {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-espresso);
  margin-bottom: 0.5rem;
}

.service-desc {
  font-size: 0.875rem;
  color: var(--color-teak);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.service-price {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: 0.05em;
}

.services-cta {
  text-align: center;
  margin-top: 2.5rem;
}

@media (max-width: 768px) {
  .services { padding: var(--section-pad-mobile); }
  .services-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .services-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Open in browser — verify 4-column card grid on desktop, cards show icon/name/desc/price, hover shows gold border**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: services section — 10 category cards with hover states"
```

---

## Task 6: Amenities Strip

**Files:**
- Modify: `index.html` — fill in `<section class="amenities">`
- Modify: `css/main.css` — add amenities styles

**Interfaces:**
- Consumes: `--color-espresso`, `--color-gold`, `--color-warm-white`, `.container` from Task 1

- [ ] **Step 1: Add amenities HTML inside `<section class="amenities" id="amenities">`**

```html
<div class="container">
  <ul class="amenities-list" aria-label="Spa amenities">
    <li class="amenity-item">
      <span class="amenity-icon" aria-hidden="true">🏊</span>
      <span class="amenity-label">Swimming Pool</span>
    </li>
    <li class="amenity-item">
      <span class="amenity-icon" aria-hidden="true">🧖</span>
      <span class="amenity-label">Sauna</span>
    </li>
    <li class="amenity-item">
      <span class="amenity-icon" aria-hidden="true">🌿</span>
      <span class="amenity-label">Organic Products</span>
    </li>
    <li class="amenity-item">
      <span class="amenity-icon" aria-hidden="true">🚗</span>
      <span class="amenity-label">Parking Available</span>
    </li>
    <li class="amenity-item">
      <span class="amenity-icon" aria-hidden="true">👶</span>
      <span class="amenity-label">Kid-Friendly</span>
    </li>
    <li class="amenity-item">
      <span class="amenity-icon" aria-hidden="true">♿</span>
      <span class="amenity-label">Wheelchair Accessible</span>
    </li>
  </ul>
</div>
```

- [ ] **Step 2: Add amenities styles to `css/main.css`**

```css
/* ── AMENITIES ───────────────────────────────── */
.amenities {
  background-color: var(--color-espresso);
  padding: 3rem 1.5rem;
}

.amenities-list {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem 3rem;
}

.amenity-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.amenity-icon {
  font-size: 2rem;
}

.amenity-label {
  font-family: var(--font-primary);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
}

@media (max-width: 768px) {
  .amenities-list { gap: 1.5rem 2rem; }
  .amenity-icon { font-size: 1.5rem; }
}
```

- [ ] **Step 3: Open in browser — verify dark espresso band with icon + gold label columns**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: amenities strip — dark band with pool, sauna, parking, etc."
```

---

## Task 7: Gallery Section

**Files:**
- Modify: `index.html` — fill in `<section class="gallery">`
- Modify: `css/main.css` — add gallery styles

**Interfaces:**
- Consumes: `--color-cream`, `--radius-card`, `.container`, `.section-script`, `.section-heading` from Tasks 1 & 5

- [ ] **Step 1: Add gallery HTML inside `<section class="gallery" id="gallery">`**

```html
<div class="container">
  <div class="section-header">
    <span class="section-script">Take a Look</span>
    <h2 class="section-heading">Our Space</h2>
  </div>
  <div class="gallery-grid">
    <figure class="gallery-item">
      <picture>
        <source srcset="assets/images/d4eb3c8c-908e-4d84-bda3-0440813806e8-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif" type="image/avif" />
        <img src="assets/images/d4eb3c8c-908e-4d84-bda3-0440813806e8-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif"
             alt="Coconut Spa & Wellness treatment room" loading="lazy" />
      </picture>
    </figure>
    <figure class="gallery-item">
      <picture>
        <source srcset="assets/images/dd391bee-1969-4543-9061-4d64a8b48d17-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif" type="image/avif" />
        <img src="assets/images/dd391bee-1969-4543-9061-4d64a8b48d17-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif"
             alt="Coconut Spa & Wellness relaxation area" loading="lazy" />
      </picture>
    </figure>
    <figure class="gallery-item">
      <picture>
        <source srcset="assets/images/ad362096-e85c-44d1-9d95-55182be72e94-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif" type="image/avif" />
        <img src="assets/images/ad362096-e85c-44d1-9d95-55182be72e94-CoconutSpaWellness-ZA-Gauteng-Midrand-GlenAustinAh-Fresha.avif"
             alt="Coconut Spa & Wellness spa interior" loading="lazy" />
      </picture>
    </figure>
  </div>
</div>
```

- [ ] **Step 2: Add gallery styles to `css/main.css`**

```css
/* ── GALLERY ─────────────────────────────────── */
.gallery {
  padding: var(--section-pad);
  background-color: var(--color-cream);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.gallery-item {
  margin: 0;
  border-radius: var(--radius-card);
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.03);
}

@media (max-width: 1024px) {
  .gallery-item img { height: 260px; }
}

@media (max-width: 768px) {
  .gallery { padding: var(--section-pad-mobile); }
  .gallery-grid { grid-template-columns: 1fr; }
  .gallery-item img { height: 240px; }
}
```

- [ ] **Step 3: Open in browser — verify 3-column grid with images, rounded corners, subtle zoom on hover**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: gallery section — 3-column photo grid with hover zoom"
```

---

## Task 8: Reviews Section

**Files:**
- Modify: `index.html` — fill in `<section class="reviews">`
- Modify: `css/main.css` — add reviews styles

**Interfaces:**
- Consumes: `--color-cream-dark`, `--color-espresso`, `--color-gold`, `--color-teak`, `--font-primary`, `--font-script`, `.container`, `.section-script` from Task 1

- [ ] **Step 1: Add reviews HTML inside `<section class="reviews" id="reviews">`**

```html
<div class="container">
  <div class="section-header">
    <span class="section-script">Kind Words</span>
    <h2 class="section-heading">What Our Guests Say</h2>
  </div>
  <div class="review-featured">
    <p class="review-quote">"Absolutely amazing experience from start to finish. The team is so professional and welcoming. I left feeling completely renewed. This is my go-to spot in Midrand!"</p>
    <div class="review-meta">
      <span class="review-stars" aria-label="5 stars">★★★★★</span>
      <span class="review-author">— Verified Fresha Guest</span>
    </div>
  </div>
  <div class="review-cards">
    <div class="review-card">
      <p class="review-card-text">"The Swedish massage was heavenly. Zandile is so skilled — I booked again before I even left."</p>
      <span class="review-card-stars">★★★★★</span>
    </div>
    <div class="review-card">
      <p class="review-card-text">"Birthday package for my girls was perfect. They made us feel so special. Thank you Coconut Spa!"</p>
      <span class="review-card-stars">★★★★★</span>
    </div>
    <div class="review-card">
      <p class="review-card-text">"Brought my husband for the couple escape. Best decision we made. We will be back every month!"</p>
      <span class="review-card-stars">★★★★★</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add reviews styles to `css/main.css`**

```css
/* ── REVIEWS ─────────────────────────────────── */
.reviews {
  padding: var(--section-pad);
  background-color: var(--color-cream-dark);
}

.review-featured {
  max-width: 700px;
  margin: 0 auto 3rem;
  text-align: center;
}

.review-quote {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--color-espresso);
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.25rem;
}

.review-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.review-stars {
  font-size: 1.3rem;
  color: var(--color-gold);
  letter-spacing: 3px;
}

.review-author {
  font-size: 0.875rem;
  color: var(--color-teak);
  letter-spacing: 0.05em;
}

.review-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.review-card {
  background-color: var(--color-warm-white);
  border-radius: var(--radius-card);
  padding: 1.5rem;
  border-left: 3px solid var(--color-gold);
}

.review-card-text {
  font-size: 0.9rem;
  color: var(--color-teak);
  font-style: italic;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.review-card-stars {
  font-size: 1rem;
  color: var(--color-gold);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .reviews { padding: var(--section-pad-mobile); }
  .review-cards { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Open in browser — verify featured pull quote centered, 3 mini review cards below with gold left border**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: reviews section — featured quote + 3 review cards"
```

---

## Task 9: Booking / Contact Section

**Files:**
- Modify: `index.html` — fill in `<section class="contact">`
- Modify: `css/main.css` — add contact styles

**Interfaces:**
- Consumes: `--color-warm-white`, `--color-espresso`, `--color-gold`, `--color-teak`, `.container`, `.btn-primary`, `.section-script`, `.section-heading` from Tasks 1 & 5

- [ ] **Step 1: Add contact HTML inside `<section class="contact" id="contact">`**

```html
<div class="container contact-inner">
  <div class="contact-left">
    <span class="section-script">Come Visit Us</span>
    <h2 class="section-heading">Ready to Unwind?</h2>
    <p class="contact-body">Book your appointment online in seconds, or get in touch with our team — we'd love to welcome you.</p>
    <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
       class="btn-primary contact-book-btn" target="_blank" rel="noopener">Book on Fresha</a>
  </div>
  <div class="contact-right">
    <div class="contact-detail">
      <span class="contact-detail-label">Address</span>
      <p>102 Allen Road, Glen Austin AH<br>Midrand, Gauteng, South Africa</p>
    </div>
    <div class="contact-detail">
      <span class="contact-detail-label">Hours</span>
      <p>Monday – Sunday<br>8:00 AM – 7:00 PM</p>
    </div>
    <div class="contact-detail">
      <span class="contact-detail-label">Booking</span>
      <p>
        <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
           target="_blank" rel="noopener" class="contact-link">Book via Fresha</a>
      </p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add contact styles to `css/main.css`**

```css
/* ── CONTACT ─────────────────────────────────── */
.contact {
  padding: var(--section-pad);
  background-color: var(--color-warm-white);
}

.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-body {
  color: var(--color-teak);
  margin-bottom: 2rem;
  max-width: 400px;
}

.contact-book-btn {
  margin-top: 0.5rem;
}

.contact-right {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 2rem;
  background-color: var(--color-cream);
  border-radius: var(--radius-card);
  border-left: 4px solid var(--color-gold);
}

.contact-detail-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.3rem;
}

.contact-detail p {
  font-size: 0.95rem;
  color: var(--color-espresso);
  line-height: 1.6;
  margin: 0;
}

.contact-link {
  color: var(--color-gold);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 1024px) {
  .contact-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 768px) {
  .contact { padding: var(--section-pad-mobile); }
}
```

- [ ] **Step 3: Open in browser — verify split layout, heading + CTA left, address/hours card right with gold left border**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: contact section — booking CTA + address/hours card"
```

---

## Task 10: Footer

**Files:**
- Modify: `index.html` — fill in `<footer class="footer">`
- Modify: `css/main.css` — add footer styles

**Interfaces:**
- Consumes: `--color-espresso`, `--color-gold`, `--color-warm-white`, `--color-teak`, `.container` from Task 1

- [ ] **Step 1: Add footer HTML inside `<footer class="footer">`**

```html
<div class="container footer-inner">
  <a href="#home" class="footer-logo" aria-label="Coconut Wellness Spa — back to top">
    <span class="footer-logo-name">COCONUT</span>
    <span class="footer-logo-script">Wellness Spa</span>
  </a>
  <div class="footer-divider" aria-hidden="true"></div>
  <nav class="footer-nav" aria-label="Footer navigation">
    <a href="#services">Services</a>
    <a href="#about">About</a>
    <a href="#gallery">Gallery</a>
    <a href="#contact">Contact</a>
    <a href="https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe"
       target="_blank" rel="noopener">Book Now</a>
  </nav>
  <div class="footer-socials">
    <a href="#" aria-label="Instagram" class="footer-social-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
    </a>
    <a href="#" aria-label="Facebook" class="footer-social-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    </a>
    <a href="#" aria-label="WhatsApp" class="footer-social-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    </a>
  </div>
  <p class="footer-copy">&copy; 2026 Coconut Spa &amp; Wellness. All rights reserved.</p>
</div>
```

- [ ] **Step 2: Add footer styles to `css/main.css`**

```css
/* ── FOOTER ──────────────────────────────────── */
.footer {
  background-color: var(--color-espresso);
  padding: 3.5rem 1.5rem 2rem;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.footer-logo-name {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.25em;
  color: var(--color-warm-white);
}

.footer-logo-script {
  font-family: var(--font-script);
  font-size: 1.2rem;
  color: var(--color-gold);
}

.footer-divider {
  width: 60px;
  height: 1px;
  background-color: var(--color-gold);
  opacity: 0.5;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 2rem;
}

.footer-nav a {
  font-size: 13px;
  letter-spacing: 0.08em;
  color: rgba(253, 250, 244, 0.75);
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: var(--color-gold);
}

.footer-socials {
  display: flex;
  gap: 1.25rem;
}

.footer-social-link {
  color: rgba(253, 250, 244, 0.7);
  transition: color 0.2s ease;
}

.footer-social-link:hover {
  color: var(--color-gold);
}

.footer-copy {
  font-size: 0.75rem;
  color: rgba(122, 92, 58, 0.6);
  letter-spacing: 0.03em;
}
```

- [ ] **Step 3: Open in browser — verify dark espresso footer with white logo, gold script, nav links, social icons, copyright**

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: footer — logo, nav links, social icons, copyright"
```

---

## Task 11: JavaScript — Mobile Menu & Sticky Nav Shadow

**Files:**
- Modify: `js/main.js` — implement all JS behavior

**Interfaces:**
- Consumes: `.site-nav` (adds `.is-scrolled`), `.nav-hamburger` (reads/sets `aria-expanded`), `.mobile-menu` (toggles `.is-open`, sets `aria-hidden`) from Task 2

- [ ] **Step 1: Write `js/main.js`**

```js
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
```

- [ ] **Step 2: Verify sticky shadow — scroll down the page; nav should gain a subtle shadow after 10px of scroll**

- [ ] **Step 3: Verify mobile menu — resize browser to < 768px, click hamburger, menu should open; click a link, it should close and scroll to the section**

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: js — sticky nav shadow, mobile hamburger menu with a11y"
```

---

## Task 12: Final Polish & Cross-Browser Check

**Files:**
- Modify: `css/main.css` — any final tweaks identified during review
- Modify: `index.html` — meta tags, favicon placeholder

- [ ] **Step 1: Add Open Graph meta tags to `<head>` in `index.html`** (after the existing `<meta name="description">`)

```html
<meta property="og:title" content="Coconut Wellness Spa — Midrand" />
<meta property="og:description" content="Full-service wellness spa in Midrand. Massages, facials, couples packages, pool & sauna. Book online via Fresha." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#2C1A0E" />
```

- [ ] **Step 2: Verify full page scroll on desktop** — all 9 sections visible and styled correctly, no layout overflow, nav links scroll to correct sections

- [ ] **Step 3: Verify at 768px (tablet)** — services grid at 2 columns, about collapses to single column, gallery collapses to single column

- [ ] **Step 4: Verify at 375px (mobile)** — nav hamburger visible and functional, hero text readable, services cards full width, all text not overflowing

- [ ] **Step 5: Verify "Book Now" / "Book on Fresha" / "Book an Appointment" links all open the correct Fresha URL in a new tab**

- [ ] **Step 6: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: final polish — OG meta, responsive verified, booking links confirmed"
```

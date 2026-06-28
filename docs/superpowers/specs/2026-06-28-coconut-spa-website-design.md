# Coconut Spa & Wellness — Website Design Spec

**Date:** 2026-06-28
**Client:** Coconut Spa & Wellness, Midrand
**Project type:** Single-page scrolling website
**Tone:** Warm & welcoming — approachable luxury

---

## Business Context

- **Address:** 102 Allen Road, Glen Austin AH, Midrand, Gauteng, South Africa
- **Hours:** Monday–Sunday, 8:00 AM – 7:00 PM
- **Booking platform:** Fresha (https://www.fresha.com/a/coconut-spa-wellness-midrand-102-allen-road-umi0yjoe)
- **Rating:** 4.8★ / 697 reviews
- **Tagline:** "Where we specialize in making your body feel as fresh and smooth as a coconut"

### Team
Nthabeleng (Consultant), Zandile (Beauty Therapist), Sindi (Beauty Therapist), Simphiwe (Therapist), Goodness

### Service Categories (10)
1. Massage & Massage Therapy
2. Skin Therapy
3. Body Therapy
4. Hands & Feet Therapy
5. Waxing & Tinting
6. Wellness Therapy
7. Couple Therapy
8. Birthday Packages
9. Pool
10. Spa Facilities

### Sample Pricing
| Service | Duration | Price (ZAR) |
|---|---|---|
| Swedish Massage | 1 hour | R650 |
| Back/Neck/Shoulder Massage | 30 min | R300 |
| Solo Escape | 2 hours | R1,300 |
| Soulmate Escape | 1.5 hours | R1,350 |

### Amenities
Swimming pool · Sauna · Organic products · Parking · Kid-friendly · Wheelchair accessible · Showers & lockers · Bath towels provided · Near public transport

---

## Design Direction

**Style:** Warm tropical luxury — editorial boldness meets natural warmth
**Reference sites:** LXNARIA (minimal editorial, bold type), Brick Canvas (cream base, elegant serif), Float Luxury Spa (full-bleed hero, refined), SERENITY (strong headline hierarchy, treatment photography)

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Warm cream | `#F5EDD8` | Page background |
| Brand gold | `#C9A84C` | Accents, borders, CTA fills, script moments |
| Espresso | `#2C1A0E` | Headlines, nav, CTA buttons, footer bg |
| Warm white | `#FDFAF4` | Cards, overlays, text on dark bg |
| Warm teak | `#7A5C3A` | Body copy, secondary text |

---

## Typography

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Display / Hero | Balimo Bold | 60–80px | Bold | Espresso or warm white on dark bg |
| Section headings | Balimo Bold | 36–48px | Bold | Espresso |
| Script accent | Great Vibes (Google Font) | 28–36px | Regular | Brand gold, used sparingly for tagline moments |
| Body copy | Balimo Regular | 16–18px | Regular | Warm teak |
| Nav & labels | Balimo Regular | 13–14px | Regular | Letter-spacing: 0.08em, tracked |
| CTA buttons | Balimo Bold | 14px | Bold | Uppercase, tracked |

**Font assets:** Balimo Regular and Bold already present in `assets/font/`
**Google Font to load:** Great Vibes

---

## Assets

### Images (3 real photos)
Located in `assets/images/` — all AVIF format:
- `ad362096-...` — assign to hero
- `d4eb3c8c-...` — assign to gallery
- `dd391bee-...` — assign to gallery

Stock imagery may supplement the gallery if needed.

### Logo
Brand mark: circle with palm tree illustration + "COCONUT" (bold all-caps) + "Wellness Spa" (script). Recreate in white SVG for use on dark backgrounds and in color on cream backgrounds.

---

## Page Structure (Single-Page Scroll)

### 1. Navigation (sticky)
- Background: warm cream `#F5EDD8`
- Logo: centered (palm circle + wordmark)
- Nav links (left): Services · About · Gallery · Contact
- CTA (right): "Book Now" — gold fill `#C9A84C`, espresso text
- Bottom border: thin gold `#C9A84C`
- Mobile: hamburger menu collapse

### 2. Hero
- Full-bleed AVIF photo with warm dark overlay (`rgba(44, 26, 14, 0.55)`)
- Layout: centered text block
  - Script "Welcome to" in brand gold above
  - "Coconut Wellness Spa" — Balimo Bold, ~72px, warm white
  - Short tagline — Balimo Regular, 18px, warm white at 80% opacity
- Two buttons:
  - "Book an Appointment" — gold fill, espresso text
  - "Explore Services" — ghost, cream border and text

### 3. About
- Background: warm cream
- Two-column layout:
  - Left: large pull quote in Balimo Bold espresso (40px), e.g. *"Your body deserves to feel as fresh and smooth as a coconut."*
  - Right: 2–3 short paragraphs of body copy, warm teak; 4.8★ reviews badge beneath
- Script accent in gold above the heading

### 4. Services
- Background: warm white `#FDFAF4`
- Section heading: "Our Services" — Balimo Bold, espresso
- Grid: 3–4 columns (responsive), one card per service category
- Each card:
  - Warm white background, 12px border-radius
  - Thin gold border on hover
  - Icon (Tabler outline or custom SVG)
  - Category name — Balimo Bold, espresso
  - Short descriptor — Balimo Regular, warm teak, 14px
  - Starting price if known
- Card hover: slight lift, gold border accent

### 5. Amenities Strip
- Background: espresso `#2C1A0E`
- Full-width horizontal icon row
- Items: Pool · Sauna · Organic Products · Parking · Kid-Friendly · Wheelchair Accessible
- Layout: icon above, label below — cream icons/text, labels in brand gold
- No border, no card — flat strip

### 6. Gallery
- Background: warm cream
- Section heading: "Our Space" — Balimo Bold, espresso
- 3-column grid using the 3 real AVIF photos
- Subtle rounded corners (8px), no captions
- Masonry-style if heights vary

### 7. Reviews
- Background: warm cream (slight shade variation — `#EFE5CC`)
- Large centered pull-quote from a real Fresha review
- Star rating (4.8★) in brand gold below quote
- Reviewer name in warm teak, 14px
- Optional: row of 3 mini review cards beneath

### 8. Booking / Contact
- Background: warm white
- Split layout:
  - Left: "Ready to unwind?" heading + "Book on Fresha" gold CTA + phone/email
  - Right: Address card (102 Allen Road, Midrand), Hours (Mon–Sun 8AM–7PM), styled address block or map embed
- Section heading script accent in gold

### 9. Footer
- Background: espresso `#2C1A0E`
- Logo centered (white version)
- Nav links row — cream, 13px, tracked
- Social icons: Instagram, Facebook, WhatsApp — cream, 20px
- Thin gold divider above social row
- Copyright line — warm teak at 60% opacity, 12px

---

## Responsive Behaviour

- **Desktop (≥1024px):** Full layouts as described
- **Tablet (768–1023px):** Services grid drops to 2 columns; About collapses to single column
- **Mobile (<768px):** Everything single column; nav collapses to hamburger; hero text scales to ~36px

---

## Technical Notes

- Pure HTML/CSS/JS — no framework
- Fonts loaded via: local `@font-face` for Balimo, Google Fonts CDN for Great Vibes
- Images: AVIF with JPEG fallback via `<picture>` element
- Booking CTA links to Fresha URL
- Smooth scroll between sections via `scroll-behavior: smooth`
- Sticky nav uses `position: sticky; top: 0; z-index: 100`

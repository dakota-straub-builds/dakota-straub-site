# Handoff: Dakota Straub Portfolio Site

A single-page marketing/portfolio site for **Dakota Straub** — an independent designer + developer working with home-service businesses (plumbing, HVAC, electrical, lawn, roofing) on brand identity, websites, and custom internal apps.

The site showcases 5 home-service brand/web projects and 1 custom-app project, each embedded as a **live, scrollable iframe** inside the portfolio tile so visitors can interact with the real work.

---

## ⚠️ About these files

The HTML/CSS/JS files in this bundle are **design references**, not production code. They are static prototypes built to communicate look, feel, copy, layout, and interaction. Recreate them in whatever stack you're standing up for Dakota (Next.js / Astro / SvelteKit / plain HTML — all fine). If you have no existing codebase yet, **Next.js (app router) with Tailwind** is the recommended path; the design uses CSS custom properties already, so the tokens map 1:1 to Tailwind theme config.

**Fidelity: high.** Colors, typography, spacing, and interactions are all final-direction. Use the exact values in this README; don't re-invent.

The home-service mini-sites in `sites/` are **standalone landing pages** for fictional brands (Evergreen Lawn, Rivet & Pipe, PolarPeak HVAC, Voltline Electric, Ironcap Roofing, Fieldstack Ops). For deployment, either:
- **Keep them as static HTML** at `/sites/<name>.html` and continue iframing them from the main page (simplest); OR
- **Rebuild each as its own route** if the framework supports nested layouts and you want them indexed separately.

---

## Files in this bundle

| File | What it is |
|---|---|
| `Dakota Straub.html` | **Current/active design.** Graph-paper aesthetic, uniform 3×2 portfolio grid, purple/red/sage accent blocks. |
| `Dakota Straub v1 (smoke).html` | First design pass — dark theme with smoky purple/red gradients. Kept for reference; **not** the direction to ship. |
| `styles.css` | All non-mini-site styling. Imported by the active HTML file. |
| `tweaks.jsx` | In-design tweak controls (palette, paper tone, grid density, headline copy). Strip from production. |
| `tweaks-panel.jsx` | Tweak panel framework. Strip from production. |
| `image-slot.js` | Drag-and-drop image placeholder web component. **Not used in active design** — strip from production. |
| `sites/lawncare.html` | Evergreen Lawn & Landscape — cream + green + lime. |
| `sites/hvac.html` | PolarPeak HVAC — dark ink + ice blue + ember orange. |
| `sites/plumbing.html` | Rivet & Pipe Plumbing — navy + copper editorial. |
| `sites/electrician.html` | Voltline Electric — black + volt-yellow industrial. |
| `sites/roofing.html` | Ironcap Roofing — bone + slate + rust. |
| `sites/fieldstack.html` | Fieldstack Ops — graph-paper, internal SaaS for service businesses (mirrors host site's aesthetic intentionally). |

---

## Design Tokens

All defined as CSS custom properties at the top of `styles.css`. Migrate to your design system / Tailwind config.

### Colors
```
/* Paper / surface */
--paper:       #f4ede0   /* warm cream, body background */
--paper-2:     #ede4d2   /* slightly darker, used for chrome bars */

/* Ink (text) */
--ink:         #0f0f10   /* near-black headlines + nav-cta */
--ink-2:       #2a2a2e   /* body / secondary text */
--ink-3:       #555560   /* tertiary / muted body */
--mute:        #8a8a92   /* labels, meta */

/* Lines */
--line:        rgba(15,15,16,0.08)
--line-strong: rgba(15,15,16,0.18)

/* Grid (graph paper) */
--grid-minor:  rgba(15,15,16,0.045)   /* every 20px */
--grid-major:  rgba(15,15,16,0.085)   /* every 100px */

/* Accent blocks */
--purple:      #6d28d9
--purple-soft: rgba(109,40,217,0.08)
--purple-tint: rgba(109,40,217,0.14)
--red:         #b91c1c
--red-soft:    rgba(185,28,28,0.08)
--red-tint:    rgba(185,28,28,0.14)
--sage:        #4a7c59
--sage-soft:   rgba(74,124,89,0.08)
--sage-tint:   rgba(74,124,89,0.16)
```

### Typography
Three families, loaded from Google Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap">
```

| Variable | Family | Where it's used |
|---|---|---|
| `--font-sans` | **Geist** | Headlines, body, nav, buttons |
| `--font-mono` | **JetBrains Mono** | Eyebrows, labels, captions, equation boxes, monospace UI bits |
| `--font-serif` | **Instrument Serif** italic | Emphasis spans inside headlines (`.serif-em`, `em.grad`) |

**Weights in play:** Geist 400/500/600/700/**800** (headlines). Mono 400/500/600. Serif 400 italic only.

**Scale (clamp-driven, fluid):**
- Hero headline: `clamp(54px, 9vw, 132px)` · weight 800 · line-height 0.92 · letter-spacing −0.045em
- Section title: `clamp(40px, 5.8vw, 88px)` · weight 800 · line-height 0.95 · letter-spacing −0.04em
- Section title `.small`: `clamp(30px, 3.6vw, 50px)` · weight 700
- Service card h3: 26px · weight 700 · letter-spacing −0.025em
- Body: 14–17px · 1.55–1.65 line-height
- Mono labels: 10.5–12px · letter-spacing 0–0.04em

### Spacing & Layout
- Max content width: `--max: 1280px`
- Section side padding: `--pad: clamp(20px, 4vw, 56px)`
- Section vertical padding: ~120px top/bottom (`hero` 140px top)
- Section-head bottom margin: 56px
- Grid gaps: 18px (work tiles, services, testimonials)

### Borders / Corners
- **Hard corners everywhere.** `--radius: 4px` is defined but only used incidentally — the graph-paper aesthetic deliberately reads as sharp/square.
- Standard border: `1px solid var(--line-strong)`
- Accent borders: `1.5px solid <accent>`
- Buttons & contact card: `1.5px solid var(--ink)`

### Shadows
There is **one** shadow primitive: a **hard offset ink stamp**.
```
box-shadow: 6px 6px 0 var(--ink);   /* tile / testimonial / service hover */
box-shadow: 4px 4px 0 var(--ink);   /* smaller cards */
```
No soft drop-shadows, no blur. The whole site is shadow-free until you hover.

### Background — Graph Paper
The signature visual is in `.paper` (fixed, z=0):
```css
background-image:
  linear-gradient(var(--grid-major) 1px, transparent 1px),
  linear-gradient(90deg, var(--grid-major) 1px, transparent 1px),
  linear-gradient(var(--grid-minor) 1px, transparent 1px),
  linear-gradient(90deg, var(--grid-minor) 1px, transparent 1px);
background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
```
A subtle SVG turbulence noise overlay (`opacity: 0.08`, `mix-blend-mode: multiply`) sits on top for paper grain. All sections are `position: relative; z-index: 1;` so they float above the grid.

---

## Page Structure

Single page, anchored sections, smooth scroll. Order:

1. **Fixed top nav** (centered floating pill, `position: fixed`)
2. **Hero** (`#top`)
3. **Work** (`#work`) — 3×2 grid of iframe tiles
4. **Services** (`#services`) — 3 cards + process equation
5. **About** (`#about`) — photo card + bio + stats
6. **Testimonials** (`#testimonials`) — 3 quote cards
7. **Contact** (`#contact`) — bordered CTA card
8. **Footer** with mega-type wordmark

### Nav (`.nav`)
- Fixed, `top: 16px`, horizontally centered, `max-width: calc(100vw - 32px)`
- Cream background w/ 85% alpha + `backdrop-filter: blur(14px) saturate(120%)`
- 1px ink border, **square corners**
- Left: brand mark (18×18 dark square with 4px purple inner square) + name + ` / ` + role label "Design & Code"
- Middle: 5 links — `Work · Services · About · Words · Contact`
- Right: dark CTA button `[● Start a project]` (green dot, dark fill)
- Mobile (<880px): hide center links + role label

### Hero
- `min-height: 100vh`, centered column, top padding 140px
- **Order top→bottom:**
  1. Pill: `[ Q3 · 2 spots open ]` in monospace, green dot, cream bg, ink border
  2. **Headline** — see special structure below
  3. Subline — JetBrains Mono, prefixed with `> `, 2 lines, max 620px, left-aligned
  4. CTA row — dark primary `[Start a project →]` + ghost `[See live work]`
  5. **Equation row** (3 colored boxes connected by `+` and `=`)
  6. Equation caption — mono, left-bordered with 2px ink
  7. **Live stats strip** — 4-cell grid with stat numbers

#### The headline — important
HTML structure:
```html
<h1 class="headline">
  <span class="accent-block accent-purple"></span>
  <span class="headline-text">
    Taking your <span class="serif-em">brand</span><br>
    from <span class="strike-out">nothing</span> to <em class="grad">something.</em>
  </span>
</h1>
```
- `.accent-block` is a thin purple rectangular bar running the full height of the headline on the left. Width: `clamp(20px, 3vw, 42px)`. Border 2px solid purple, fill `--purple-tint`.
- `.serif-em` swaps `brand` to Instrument Serif italic (still ink-colored).
- `.strike-out` draws a 4px red bar across `nothing` at 52% height, rotated −2deg via `::after`.
- `em.grad` paints `something.` in Instrument Serif italic, color `--red`.

This pattern (left-accent block + serif emphasis + strike-through) is the **brand signature** — used again in section titles. Reuse it consistently.

#### Equation row (`.equation`)
3 colored boxes side-by-side with `+` and `=` between:
```
[ Your Brand ]   +   [ Automation ]   =   [ Something Bigger ]
  purple              red                   sage
```
Each `.eq-box` is `min-width: 180px`, 1.5px border in its color, faint tinted fill, monospace label centered. The operators are `font-family: var(--font-mono)`, size 24px, color `--ink-3`.

A second instance lives in the Services section as the "process equation":
```
[ Your Niche Problem ] + [ Design + AI Tools ] = [ Software That Fits ]
```

#### Live stats strip (`.live-strip`)
4 equal cells, ink-bordered, 50% cream fill. Each cell has:
- Top: `// shipped` monospace label (uppercase)
- Middle: large 38px stat (purple `+` on `6+`)
- Bottom: monospace caption

Mobile (<720px): collapses to 2×2.

### Work section
Heading:
```
/ 02 · selected work    [eyebrow, mono]
Live sites & apps.       [section title]
Picked by hand.          [.serif-em]
> Every tile below…      [section sub, mono]
```

**The grid:**
```css
.grid-work {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.tile {
  aspect-ratio: 16 / 11;
  border: 1px solid var(--line-strong);
  /* ... */
}
```
6 tiles, all identical aspect ratio. **No featured/large variant** — uniformity is the brief.

Each tile contains:
1. `.tile-chrome` — 30px-tall faux browser bar with traffic-light dots (red/yellow/sage, ink-bordered), URL pill (`evergreenlawn.co`, mono), open-in-new-tab `↗` link
2. `.tile-frame` — `<iframe>` filling the rest of the tile, `loading="lazy"`, white fallback bg
3. `.tile-meta` — slides up on hover (`transform: translateY(72%) → 0`, `opacity 0 → 1`, 350ms cubic-bezier(.2,.7,.2,1)). Dark gradient background, paper text, monospace `[ Brand ]`/`[ Web ]`/`[ App ]` tags, project title 19px, one-line description.

**Tile hover behavior:**
- `transform: translateY(-3px)`
- Border becomes `var(--ink)`
- Adds `box-shadow: 6px 6px 0 var(--ink)`
- 250ms transition

**The 6 tiles in order:**
| # | id | URL displayed | Tags | Title |
|---|---|---|---|---|
| 1 | lawncare | evergreenlawn.co | Brand, Web | Evergreen Lawn & Landscape |
| 2 | plumbing | rivetandpipe.com | Brand, Web | Rivet & Pipe Plumbing |
| 3 | hvac | polarpeak.io | Web, Booking | PolarPeak HVAC |
| 4 | electrician | voltline.com | Brand, Web | Voltline Electric |
| 5 | roofing | ironcaproofing.com | Brand, Web, Print | Ironcap Roofing & Exterior |
| 6 | fieldstack | fieldstack.app | App, Automation | Fieldstack Ops |

Mobile breakpoints: 980px → 2 cols, 640px → 1 col + meta always visible (no hover state on touch).

Below the grid: `[ view full archive ↗ ]` link — bordered button-style, inverts to ink on hover. Currently `href="#"` — wire up later.

### Services
Heading: `/ 03 · what i do` → `Three things, done well.`

3-column grid of `.svc` cards:

| Card | Border | Title | Price | Timeline |
|---|---|---|---|---|
| 01 — [ Brand Identity ] | purple | Brand & Visual System | from $3,400 | 3–5 weeks |
| 02 — [ Websites ] | red | Web & Marketing Sites | from $5,800 | 4–6 weeks |
| 03 — [ Application Development ] **NEW** | sage (with sage tint fill) | Custom Business Apps | from $9,500 | 6–10 weeks |

Each card:
- 1.5px border in its accent color
- Top: 3-part head — `// 01` mono num · `[ Brand Identity ]` bordered label pill · optional `NEW` badge (ink bg, paper text)
- Dashed underline separator
- Title (26px, weight 700, ink)
- Paragraph
- Monospace bulleted list (each line starts with `— `)
- Dashed top separator → footer row: `from $X,XXX` · timeline
- Hover: lifts 3px + 6×6 currentColor stamp shadow

The third card (`svc-sage svc-featured`) is the new/featured offering — it has a sage tint background instead of cream. The NEW badge calls it out.

Below the cards: **process equation** (see Equation row above) with caption:
```
| You no longer wait for a big tech vendor to build the specific tool your
| shop needs. We design it, ship it, and own it together.
```
(Left-pipe-bar styling — mono, max 640px, line-height 1.65.)

### About
Single card (`.about-card`), bordered, 36px padding, 2-col grid (0.8fr : 1fr, gap 56px).

**Left: photo placeholder**
- 4:5 aspect, paper-2 bg, ink border
- Inner: 14px inset dashed border with repeating 45deg stripes pattern, centered label `[ photo placeholder ]`
- Bottom-left badge: `● BROOKLYN · UTC−5` (ink bg, paper text, mono uppercase, 10.5px, green dot)
- **Action item for dev:** drop in a real photo of Dakota when supplied. Suggest a square-crop portrait or a workspace shot.

**Right: copy**
- Eyebrow `/ 04 · about`
- Title: `Designer who can code. Developer who can design.` (`.serif-em` on "code." and "design.")
- 2 paragraphs of bio
- Dashed top border → 3-column stats grid:
  - `// experience` · **6+** (`+` is purple serif italic) · "years in the trenches"
  - `// shipped` · **42** · "brands & apps"
  - `// served` · **12** · "countries"

Mobile (<920px): single column, 36px gap, 24px card padding.

### Testimonials
Heading: `/ 05 · what they said` → `Words from the folks who paid me.`

3 equal `.quote` cards in a row:
- Top: `/ 01` mono number in purple, dashed underline
- Big quote (`<blockquote>`) — 16.5px, weight 500, ink, max ~25 words
- Bottom: dashed top border → 42×42 square avatar (paper text on color: purple/red/sage) + name + monospace role line

Hover: 3px lift + ink border + 4×4 ink stamp.

**Content used:** all 3 quotes name characters from the portfolio sites (Elena Marsh / Evergreen, Jordan Tan / PolarPeak, Rae Patel / Rivet & Pipe) — keep this internally consistent. Replace with real testimonials when Dakota has them.

### Contact
A single bordered card (1.5px ink, cream 70% fill), max 980px, 56px / 5vw / 64px padding:
- Eyebrow `/ 06 · let's make something`
- Headline: `Got a half-formed idea?` + `I'll take it from there.` (serif italic on second line)
- Big mailto button: `[ hello@dakotastraub.com ]` — JetBrains Mono, ink bg, paper text, square corners, brackets are `opacity: 0.55`. Hover: bg → purple.
- 56px below: dashed top border → 3-col meta grid:
  - `// based in` · Brooklyn, NY · UTC−5
  - `// working on` · 2 projects · Q3 booking open
  - `// find me` · Read.cv · Instagram · LinkedIn (underlined links, purple hover)

Mobile (<720px): meta collapses to 1 col.

### Footer
- Top row: brand mark + name | `/work /services /about /words /contact` (mono) | `© 2026 — designed & built in Brooklyn`
- Below: **mega-type wordmark** — `Dakota Straub` at `clamp(80px, 22vw, 320px)`, weight 800, line-height 0.82, letter-spacing −0.06em, ink color, slight bottom overflow (`margin: 24px 0 -8%`)
- A `::after` pseudo with `content: "Dakota Straub"` in Instrument Serif italic, purple, 85% opacity, offset right ~0.4em and overlapping (negative margin-top) to create a layered italic shadow effect

---

## Interactions

| Element | Behavior | Detail |
|---|---|---|
| Nav links | scroll-to-anchor | `html { scroll-behavior: smooth; }` |
| `.tile` | hover lift + ink stamp | 3px translate, 6×6 hard shadow, 250ms |
| `.tile-meta` | hover slide-in | translateY 72%→0, opacity 0→1, 350ms cubic-bezier(.2,.7,.2,1) |
| `.tile-frame` | scrollable on hover | natural iframe scroll. Use `loading="lazy"` |
| `.open-new` ↗ | new tab | `target="_blank" rel="noopener"` |
| `.svc:hover` | lift + colored stamp | 3px, 6×6 currentColor shadow |
| `.quote:hover` | lift + ink stamp + border | 3px, ink border, 4×4 stamp |
| Buttons | lift on press-state | 1px translate, bg shift |
| `.contact-email:hover` | bg → purple | 150ms |

**No JS interactions** in the active design beyond smooth-scroll. The Tweaks panel (React) is a build-time-only tool — strip from production.

---

## Mini-Site Catalogue (the embedded iframes)

Each `sites/*.html` is a self-contained static page with its own brand palette, fonts, and copy. They are **deliberately** styled differently from the host portfolio to demonstrate Dakota's range. Treat them as 6 distinct "case study previews" — recreate them as their own routes, or keep static and serve from `/sites/`.

| Site | Brand | Primary palette | Fonts |
|---|---|---|---|
| `lawncare.html` | Evergreen Lawn & Landscape | `#0f5132` green, `#c4f054` lime, `#f4f1e8` cream | DM Serif Display + Inter Tight |
| `hvac.html` | PolarPeak HVAC | `#0a1628` ink, `#3b82f6` sky, `#fb923c` ember, `#f8fafc` paper | Space Grotesk + JetBrains Mono |
| `plumbing.html` | Rivet & Pipe Plumbing | `#0d1b2a` navy, `#c2410c` copper, `#fefcf7` cream | Fraunces + Manrope |
| `electrician.html` | Voltline Electric | `#0b0b0c` black, `#facc15` volt yellow | Archivo + IBM Plex Mono |
| `roofing.html` | Ironcap Roofing | `#1f2937` slate, `#b45309` rust, `#f5f1e8` bone | Bricolage Grotesque + Inter |
| `fieldstack.html` | Fieldstack Ops (SaaS) | matches host portfolio palette (purple/red/sage on cream) | Geist + JetBrains Mono + Instrument Serif |

**Each mini-site contains:** sticky nav, hero with tagline + dual CTAs, services list/grid, social-proof section (testimonial, stats, integrations, etc.), booking/contact form (vanilla `<form>` with `onsubmit` event handler that previews a success state in the button), footer. All forms are placeholder — wire to a real handler (Resend, Formspree, etc.) on deploy.

The forms currently mutate button text on submit:
```js
onsubmit="event.preventDefault(); this.querySelector('button').textContent = '✓ Sent — call within 1 hr'"
```
Replace with proper form handlers per your stack.

---

## State Management

Effectively **none** in production — this is a static marketing site. The only state is:
- Anchor-driven scroll position (browser-native)
- Iframe scroll positions (browser-native, per-iframe)
- Hover states (CSS only)

Strip `tweaks.jsx` and `tweaks-panel.jsx` before deploy — those drive an in-design control panel for iterating, not user-facing UI.

---

## Responsive Behavior

| Breakpoint | What collapses |
|---|---|
| ≤ 980px | Work grid 3→2 cols; About card → single col |
| ≤ 920px | Services 3 cards → 1 col; Testimonials 3 → 1 col |
| ≤ 880px | Nav middle links hidden; brand role label hidden |
| ≤ 720px | Live stats strip 4→2 grid; contact meta 3→1 |
| ≤ 640px | Work grid → 1 col; tile-meta always visible (no hover) |

Hero headline collapses to stacked column with accent block becoming a horizontal bar.

---

## Assets
- **No image assets** ship with the design (the about-photo is a CSS placeholder). When Dakota provides a portrait, drop it into the `.about-photo` slot.
- **Logo:** procedurally drawn — small dark square with purple inner square (`.brand-mark` in CSS). Replace if Dakota has a custom mark.
- **Icons:** all inline SVG, hand-drawn, 14–20px stroke icons. Inherit `currentColor`.
- **Fonts:** Google Fonts only (Geist, JetBrains Mono, Instrument Serif). Self-host on production for perf.

---

## Suggested deploy checklist

- [ ] Strip `tweaks.jsx`, `tweaks-panel.jsx`, `image-slot.js` (unused in active design)
- [ ] Strip the `<deck-stage>`-related `data-screen-label` attrs if they confuse your framework (they're a no-op in browsers)
- [ ] Replace mailto with real contact form (Resend / Formspree / Sendgrid)
- [ ] Wire `[view full archive ↗]` to a real archive page or remove
- [ ] Add real og:image / twitter card metadata (the design lends itself to a graph-paper card with the hero headline)
- [ ] Self-host fonts (subset Geist 400/500/700/800, JetBrains Mono 400/500, Instrument Serif 400 italic)
- [ ] Add favicon (4×4-pixel purple-on-ink mark of the `.brand-mark` element works)
- [ ] Add a real photo of Dakota in the About card
- [ ] Replace testimonial copy with real client quotes
- [ ] Wire the 6 mini-site form `<button>` submits to whatever lead-capture backend Dakota uses
- [ ] Update social links in contact section (currently `href="#"` placeholders)
- [ ] Verify the iframes work cross-origin if mini-sites are served from a subdomain
- [ ] Lighthouse / a11y pass — the design uses sufficient contrast, but verify keyboard nav and screen-reader labels for the iframe tiles
- [ ] Sitemap + robots.txt

---

## Open questions for Dakota

Things the design assumes but should be confirmed:
1. **Real email address.** Currently `hello@dakotastraub.com` placeholder.
2. **Real location.** Brooklyn placeholder.
3. **Logo:** is the simple square mark final or does he have a brand asset?
4. **Booking flow:** does Q3 availability info auto-update or stay as static copy?
5. **The 6 portfolio projects are fictional.** They're meant as visual proofs of concept. When Dakota has real client work, swap them in — the system supports any 6 (or N) projects in the 3×N grid.
6. **App Development pricing.** "From $9,500 / 6–10 weeks" is a reasonable starter — verify with Dakota.

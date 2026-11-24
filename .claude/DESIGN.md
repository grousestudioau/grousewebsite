# Grouse Design System — Adventurer

*July 2026. Extracted from `grouse-homepage-v2.html`, which is the reference
implementation. The page is the source of truth; this doc describes it. If the
two disagree, the page wins and this doc is stale.*

Pairs with `Grouse — Adventurer Positioning One-Pager.md` (strategy, voice, the
filter). Supersedes the Bricolage/DM Sans system — kept at
`Grouse_Design_System_LEGACY-bricolage.md`.

Design discipline mirrors voice discipline: structural, calm, nothing decorative
for its own sake. The page is a field instrument, not a brochure.

---

## Colour

| Token | Value | Use |
|-------|-------|-----|
| `--navy` | `#2d3047` | Base. Dark sections, headings. |
| `--navy-deep` | `#232639` | Deeper navy, layering within dark sections. |
| `--orange` | `#ff6633` | Accent only — CTAs, emphasis. Never flooded. |
| `--paper` | `#f4f1ea` | Default page background. |
| `--paper-dark` | `#ebe7dc` | Alternating section background. |
| `--white` | `#ffffff` | Cards. |
| `--ink` | `#2d3047` | Body text. Same value as navy. |
| `--slate` | `#5b6b7f` | Secondary copy. |
| `--slate-light` | `#98a5b3` | Captions, meta. |
| `--hairline` | `rgba(45,48,71,0.14)` | Borders, dividers. Alpha, not solid. |

Navy is the base, orange is the accent, paper is breathing room. Orange draws the
eye to one thing; it never fills a page.

**Topographic texture** — the signature of the refresh. Contour lines, scoped per
section, always decorative and `pointer-events: none`:

| Token | On paper | On navy |
|-------|----------|---------|
| `--topo-c` (contour) | `rgba(45,48,71,0.085)` | `rgba(244,241,234,0.07)` |
| `--topo-idx` (index line) | `rgba(45,48,71,0.16)` | `rgba(244,241,234,0.13)` |

Topo images sit at `opacity: .85–.9`, ~560–620px, bled off the section edge
(`right: -140px` / `left: -140px`), `z-index` below content. Grain overlay is a
separate `.grain` layer.

## Type

Three families, three jobs.

- **Display — `geom-graphic`** (Adobe Fonts), weights 600/700. `h1, h2, h3` and
  `.signplate` only.
- **Body — `Barlow`**, 400/500/600 + italic 400. Stack:
  `'Barlow', -apple-system, sans-serif`.
- **Mono — `IBM Plex Mono`**, 400/500. Class `.mono`: uppercase,
  `letter-spacing: .07em`. Instrument labels, coordinates, HUD, eyebrows.

`geom-graphic` is a Typekit/Adobe Fonts webfont — it needs a reachable kit link.
Anything that has to render offline or get exported (PDF, email, ad creative)
must have a fallback decided, not inherited.

**Scale**

| Role | Value |
|------|-------|
| Hero H1 | `clamp(44px, 8.4vw, 122px)`, `line-height: 1.05`, uppercase, `ls .01em` |
| Display large | `clamp(38px, 6.6vw, 96px)` |
| Display medium | `clamp(34px, 5.4vw, 64px)` |
| Section heading | `--h-section: clamp(31px, 4.2vw, 48px)` |
| Body | 16.5–19px, `line-height: 1.65` |
| Secondary | 15px |
| Mono / meta | 11–12px, `letter-spacing: .08em` |

Body floor is **16.5px**. Mono at 11–12px is the one exception — it reads as an
instrument label, not a sentence, and only survives at that size in uppercase
mono with tracking. Do not set prose below 15px.

## Radius

`3px` (default) · `4px` (cards, panels) · `50%` (circular) ·
`3px 4px 3px 5px` (irregular — hand-drawn field-notes edge, used deliberately).

> **This reverses the legacy system**, which mandated 8/12/16 and explicitly
> banned "3–6px near-hard corners." The adventurer look is hard-edged and
> surveyed on purpose. Flagging it as a decision, not drift — if it *was* drift,
> this is where to catch it.

## Layout

- **Container:** 1200px max (1280px for full-bleed/topo sections).
- **Side padding:** 26px.
- **Reading column:** 560px. Short measures — 420px for callouts.
- **Hero padding:** `14vh 26px`.
- **Alignment:** left by default. Centred only where it earns it.

## Motion

The system the legacy doc never had. Already implemented in v2 — extend it, don't
reinvent it.

| Token / pattern | Value |
|-----------------|-------|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Spring (playful, rare) | `cubic-bezier(0.34, 1.56, 0.64, 1)` @ `.45s` |
| Scroll reveal | `.reveal` → `opacity: 0; translateY(26px)` → `.in`, `.9s` |
| Hover / interactive | `transform` + `box-shadow`, `.25s`–`.35s` |
| Ambient loops | `spin 50s`, `march 2.2s`, `th-march 1.4s` — linear, infinite |

`.reveal` is driven by `IntersectionObserver`, which adds `.in`. Reveals are
slow (`.9s`) and short (26px) — the page settles, it doesn't perform.

**Reduced motion is handled and must stay handled:**

```css
@media (prefers-reduced-motion: reduce) {
  .grain { display: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
  #loop-path, #loop .needle, .trailhead .th-line { animation: none; }
  .hero .video { display: none; }
}
```

Any new animation gets an entry here. No exceptions.

**No animation library.** The page is static HTML with inline CSS/JS and no build
step. Reveals, hovers, and loops are covered by CSS + `IntersectionObserver`
above. For scroll-linked effects use `animation-timeline: view()`; for layout
morphs use `element.animate()`. Reach for a dependency only if a real effect
proves impossible natively — not before.

## Components

- **Buttons:** orange fill, white text, 3px radius.
- **Cards:** white, 4px radius, `--hairline` border.
- **Dark sections:** navy / navy-deep for emphasis moments (hero, closing CTA).
- **Signplate:** navy bg, paper text, geom-graphic 600 — the wayfinding marker.
- **HUD:** fixed instrument, bottom-left (`22px`), `z-index: 80`, mono.
- **Eyebrows:** mono, uppercase, tracked. One per major section, maximum.

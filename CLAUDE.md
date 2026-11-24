# CLAUDE.md — Grouse Studio website

Source of truth for anyone working on this repo, human or Claude. Read it before
you touch anything.

**One business, two brands, two repos.** Grouse Studio and SISU Training Academy
are the same company, same building, same coaching standard, different audience.

| | Repo | Live | Who it's for |
|---|---|---|---|
| **Grouse** (this repo) | `grousestudioau/grousewebsite` | https://grousestudio.au | Adults, members |
| **SISU** | `grousestudioau/sisutrainingacademy` | sisutrainingacademy.com | Parents first, young athletes 10–18 |

The two should feel like two products from the same maker: same discipline,
different face. The voice rules are shared; the look is not.

---

## Working together on `main` (we both push here)

`main` **is** the live site. No staging, no PR gate, so a bad push is a live bug,
and now more than one person pushes here. Follow this every time.

**Before you start**
1. `git fetch origin && git log --oneline -15 origin/main` — see what changed
   since you last worked. Read the diffs that matter before editing.
2. `git pull --rebase origin main` — get level. Resolve conflicts now, not at
   push time.
3. Re-read this `CLAUDE.md` and `.claude/` — the other person may have moved the
   standard itself.

**Before you push**
4. Commit with a clear message: what changed, and which page(s).
5. `git fetch origin && git rebase origin/main` again — someone may have pushed
   while you worked.
6. `git push origin main`. **Never force-push `main`. Never rewrite pushed
   history.**
7. Verify live: wait 1–2 min, load the live URL, confirm a string that is **new
   in your change** (an old string passes against the stale version still being
   served, so it proves nothing).

**Bigger or riskier changes** — push a branch and tell the other person, rather
than landing a large rebuild straight on the live site. If you change the shared
standard (this file or `.claude/`), say so in the commit message so it's noticed
on the next pull.

**Auth** — each person uses their own GitHub login (`gh auth login`, or a git
credential helper). Don't share tokens, and don't commit them.

---

## How we work

- **Build** → see *This repo* below for the stack and deploy.
- **Design** → `.claude/DESIGN.md` is the system. The page is the source of
  truth; if the doc and the page disagree, the page wins and the doc is stale.
- **Speak** → `.claude/VOICE.md` governs every public word. Hard bans: no em
  dashes, no antithesis / corrective negation, no rule of three, no negative
  parallelism, no performed enthusiasm. The repair when a line fails is
  **deletion, not a fresh device**. Never invent commitments (times, guarantees,
  offers) — flag the gap instead.
- **Keep it lean** — static HTML/CSS, no build step beyond Pages, no animation
  library, no dependency added for what a few lines of native code can do.

## Tools we use (install these for a consistent result)

Both of us should run the same skills so the site comes out the same way. In
Claude Code:

| Tool | For | Install |
|---|---|---|
| **taste-skill** | building / redesigning pages to a professional bar | `/plugin marketplace add Leonxlnx/taste-skill` then `/plugin install taste-skill@taste-skill` |
| **unslop** | fixing UI that looks AI-generated | `/plugin marketplace add heydamir/unslop` then `/plugin install unslop@heydamir` |
| **ui-ux-pro-max** | palettes, type pairings, style tokens | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` |
| **modern-web-guidance** | check FIRST on any HTML/CSS/JS — web APIs move fast | `/plugin marketplace add GoogleChrome/modern-web-guidance` then `/plugin install modern-web-guidance@googlechrome` |
| **playwright-cli** | screenshots / visual checks (prefer over ad-hoc headless Chrome) | `npm install -g @playwright/cli@latest` then `playwright-cli install --skills` |
| **ponytail** | lazy-dev mode: simplest thing that works, no over-building | `/plugin marketplace add https://github.com/DietrichGebert/ponytail.git` then `/plugin install ponytail@ponytail` |
| **claude-mem** | memory / continuity across sessions | `/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem@thedotmack` |

Which design skill for which job: **build new** → taste-skill, **fix AI-looking
UI** → unslop, **pick a look** → ui-ux-pro-max. Don't run all three at a problem.

If you don't have one of these, install it before doing design/build work here,
so both of us produce the same thing.

---

## This repo (Grouse)

- **Stack:** Jekyll on GitHub Pages. `_config.yml`, `_layouts/`, page sources,
  and images under `wp-content/uploads/` (paths kept from the old WordPress site;
  WordPress itself is retired — this repo is the live site). `baseurl: ""`.
- **Deploy:** push to `main`; Pages rebuilds in ~1–2 min. No build step to run
  locally beyond Jekyll if you want to preview.
- **Look:** Grouse "Adventurer" system (`.claude/DESIGN.md`). Light ground
  (paper `#f4f1ea`), navy `#2d3047` base, orange `#ff6633` as accent only — never
  flooded. Type: `geom-graphic` (display) / Barlow (body) / Space Mono (labels).
  Topographic contour texture, grain overlay, 3–4px radius (hard-edged on
  purpose). Motion is CSS + `IntersectionObserver`; reduced-motion is handled and
  must stay handled.
- **Photos:** responsive `srcset` with 640/1080/1600w variants generated by
  `sips` (it can't resample `.webp`), plus the original, with per-image `sizes`
  measured from the real display slot. When you add a photo, make the three
  variants and wire `srcset` + `sizes` to match. Decorative PNGs are left alone.
- **Contact form:** posts to a Google Apps Script endpoint set in `_config.yml`
  (`contact_form_endpoint`); source in `_tools/`.

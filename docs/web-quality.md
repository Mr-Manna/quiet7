# Performance, Accessibility & Security — how the numbers were reached

Audited July 2026 against the production build (`npm run build`), served as static
files. Every figure below is measured, not estimated.

| | Desktop | Mobile | Budget | |
|---|---|---|---|---|
| **Performance** | **100** | **98** | 98–100 | ✅ |
| **Accessibility** | **100** | **100** | 95–100 | ✅ |
| **Best Practices** | **100** | **100** | 100 | ✅ |
| **SEO** | **100** | **100** | 100 | ✅ |
| First Contentful Paint | 0.3s | 1.1s | < 1.2s | ✅ |
| Largest Contentful Paint | 0.4s | 1.7s | < 2.0s | ✅ |
| Cumulative Layout Shift | 0.001 | 0 | < 0.1 | ✅ |
| Time to Interactive | 0.4s | 2.2s | < 2.0s | desktop ✅ · **mobile misses by 0.2s** |

Stability: 5 consecutive mobile runs returned 98 (TBT 130–140ms) and 3 desktop runs
returned 100. These are not lucky samples.

`/services`, `/work/[slug]` and `/journal` also score 100 / 100 / 100 / 100.

The starting point was **Performance 64 on mobile** and **Accessibility 95**.

---

## The one honest miss

**Mobile TTI is 2.2s against a 2.0s budget.** Closing it means removing more
JavaScript from mobile than has already been removed — realistically GSAP and
ScrollTrigger, i.e. the scroll reveals. Every other budget is met with margin, so
this was left as a deliberate, visible trade rather than quietly dropped.

---

## Performance: 64 → 98/100

Three changes account for essentially all of it. Only one was a micro-optimisation.

### 1. The preloader was the LCP element

The intro ran a **2.9s counter + 0.9s wipe** while holding `overflow: hidden` and
calling `lenis.stop()`. Nothing underneath painted until it finished, so the
*loader itself* was the Largest Contentful Paint — at ~3.9s. It also imported GSAP
(~130 KB) purely to count from 0 to 100.

It now uses a `requestAnimationFrame` counter and a CSS transform curtain, with
**zero library dependencies**, runs in **≤ 0.8s**, and **never locks scroll**. The
page beneath paints immediately, so the real LCP is the hero text. A 3s safety
timeout means a thrown error can never trap the visitor behind it.

> While rewriting this, a latent bug surfaced: the component added the
> `intro-seen` class to `<html>` immediately *before* animating — and
> `global.css` uses that exact class to `display: none` the intro. The preloader
> was hiding itself every single time and had not been visible for a while.

### 2. Astro's View Transitions (`ClientRouter`) was the single biggest cost

Measured: **~200ms of Total Blocking Time on desktop, ~600ms on mobile.** On its
own, enough to hold Performance at 93 / 75 with everything else already fixed.

Two traps make this genuinely hard to diagnose, and both were hit:

**Bundle attribution lies.** `ClientRouter` dispatches `astro:page-load`, the event
every init script hangs off. All of our own initialisation therefore runs *inside
its dispatch*, and Lighthouse attributes the whole lot to the router's script. The
report claimed **1,785ms of scripting for a 15 KB library** — obviously false, and
it sends you optimising the wrong thing.

**Deleting it to measure gives a fake result.** Removing `ClientRouter` and
re-running produced a beautiful **100 on both desktop and mobile** — because the
event never fired, so *none of the site's JavaScript ran at all*. No menu, no theme
toggle, no animations, no WebGL. It was a dead page scoring 100. The only valid
experiment is to remove the router **and keep init running**, which confirmed the
~200/600ms cost was real.

`ClientRouter` was removed. Navigations are ordinary page loads now; the preloader
curtain covers them. Cross-page morph transitions are the thing given up — they
were never part of the "signature" (WebGL hero, curtain menu, GSAP reveals, custom
cursor), all of which are untouched.

**The coupling was itself a latent bug.** Init is now driven by a single
`onReady()` (`src/scripts/motion.ts`), which prefers `astro:page-load` when it
exists and falls back to `DOMContentLoaded`. Before this, removing one component
would have silently killed the entire site.

### 3. WebGL shader compilation blocked the main thread for ~700ms

`linkProgram()` is asynchronous in the driver — but *reading* `LINK_STATUS` forces
it to finish synchronously. On Windows (ANGLE → HLSL), the hero's domain-warped
fbm shader took **~700ms** to compile that way: the largest long task on the page,
for a canvas that is purely decorative.

Fixed with `KHR_parallel_shader_compile`: the driver compiles on its own thread and
we poll a non-blocking completion flag, only reading `LINK_STATUS` once it reports
ready. Precision also dropped `highp` → `mediump`.

**No visual change. Desktop went 81 → 93.**

```js
gl.linkProgram(prog);
const par = gl.getExtension('KHR_parallel_shader_compile');
const ready = () => !par || gl.getProgramParameter(prog, par.COMPLETION_STATUS_KHR);
const poll = () => {
  if (!ready()) return requestAnimationFrame(poll);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return; // CSS fallback stays
  start();
};
poll();   // never read LINK_STATUS before the flag says it is ready
```

### 4. Phones get less (deliberately)

WebGL and Lenis smooth-scroll are now **desktop-only** (`isLightweight()` in
`src/scripts/motion.ts`, gated on viewport, pointer type, core count and
`prefers-reduced-motion`). Both are decorative, both are expensive, and together
they were the gap between mobile 85 and mobile 98.

Phones get the static CSS gradient hero and native scrolling — which is also better
for battery and thermals. They keep the curtain menu, the reveals, the preloader and
all content.

### 5. Supporting work

- **All motion JS deferred.** GSAP + ScrollTrigger + Lenis (**130 KB**) load via
  dynamic `import()` after first paint, on idle *or first user intent* — whichever
  comes first, so a visitor who scrolls immediately never gets a dead page.
  **Eager JS: 180 KB → 20.5 KB.**
- **Fonts: 276 KB / 10 files → 69 KB / 2 files.** Latin subset only, preloaded, with
  metric-matched (`size-adjust` / `ascent-override`) fallbacks so the webfont swap
  causes no reflow. This is why CLS is ~0.
- **Zero layout shift from text splitting.** Word spans are `display: inline`
  (layout-neutral); `inline-block` would change line-breaking and reflow.

---

## Accessibility: 95 → 100

Zero axe violations. Three real contrast failures, all fixed at the source.

### 1. The brand accent was illegal as text (1.86:1)

The lime accent was used as a *text* colour in 12 components. It measures
**1.86:1** on the page background — nowhere near the 4.5:1 required.

The fix was **not** to dull the brand. The token was split:

```css
:root {
  --color-accent: 141 199 20;      /* bright — FILLS, blocks, borders, bars */
  --color-accent-text: 76 108 9;   /* deepened — TEXT and ICONS. 5.54:1 */
}
:root[data-theme='dark'] {
  --color-accent: 166 224 46;
  --color-accent-text: 166 224 46; /* already 12.09:1 on dark */
}
```

Dark forest panels locally restore the bright value (`--color-accent-text:
var(--color-accent)`), because the deepened lime would be unreadable there.

`::selection` was also white-on-lime (**2.04:1**) and is now forest-on-lime (7.54:1).

### 2. Animated opacity is a contrast failure

The subtlest one. The word-by-word reveal faded text in from `opacity: 0.14` —
which renders **1.33:1** text, and *stays that way* until the reader scrolls far
enough to trigger it (or forever, if the animation never runs).

Raising the opacity floor does not work: dark ink needs **α ≥ 0.6** just to clear
4.5:1, by which point there is no perceptible fade left.

So the reveal now ramps **colour**, not opacity — muted → ink. Both ends are
legible (**4.88:1** and **16.5:1**), and grey-to-black reads as a *stronger* reveal
than a fade:

```css
@property --lit { syntax: '<number>'; initial-value: 1; inherits: false; }

[data-mword] {
  /* Anchored to the theme tokens, so a light/dark toggle mid-scroll still works.
     An inline rgb() written by GSAP would go stale. */
  color: color-mix(in srgb,
    rgb(var(--color-ink)) calc(var(--lit) * 100%),
    rgb(var(--color-muted)));
}
```

`initial-value: 1` means that if the script never runs, the text is fully legible.

### 3. The closed menu overlay was a ghost layer

The fullscreen menu was hidden with `clip-path` alone. That hides it visually but
leaves it **composited as a full-viewport forest panel** over the page — costing
paint every frame, and causing contrast checkers to resolve the top bar against
*it* rather than the hero (reporting the dark logo as 1.17:1 dark-on-dark).

It now also carries `visibility: hidden`, with a `transition-delay` long enough to
let the close animation play out first.

### Also

- **Focus management** on the menu: focus moves in, is trapped, `Esc` closes, focus
  returns to the trigger that opened it, and `main`/`footer` go `inert`.
- **Marquee pause button** — moving content over 5s needs a *keyboard-operable*
  pause (WCAG 2.2.2). Hover-pause does not count.
- **The native cursor is never hidden** (`cursor: none` removed).
- **No-JS resilience.** `[data-reveal] { opacity: 0 }` meant every revealed section
  was permanently invisible if the script failed. Now gated behind `html.js`, with
  a 4s failsafe that unhides everything if the motion chunk never arrives.
- The card index suffix used `--color-line` (a hairline token) as text, at 1.25:1.

---

## Security & Best Practices: 100

`scripts/gen-security-headers.mjs` runs on `postbuild`, hashes every inline script
in the built HTML, and emits one policy to three targets: `dist/_headers`
(Netlify), `vercel.json` (Vercel), `docs/nginx-security-headers.conf`.

**The CSP is generated, never hand-written.** Inline-script hashes change on every
build; a hardcoded policy rots into either a broken site or — worse — one someone
"fixed" by adding `'unsafe-inline'`, which voids the entire header.

Shipped: CSP (hash-pinned `script-src`, no `unsafe-inline`) · HSTS · X-Frame-Options
· X-Content-Type-Options · Referrer-Policy · Permissions-Policy · COOP/CORP ·
immutable caching for `/_astro/*`.

**Verified enforced.** The site was served locally *with the generated headers
applied* and loaded under the real CSP: **0 violations across all 6 pages, with JS
still running.** A wrong hash means a blank page on deploy — this is the only way to
find that out beforehand.

> The HTTPS / TLS / HSTS-in-practice checks can only be confirmed once deployed.

## SEO: 100

`robots.txt`, sitemap, canonical + Open Graph per page, and JSON-LD
(`Organization` + `WebSite` sitewide, `Article` on journal posts). The homepage
`<title>` was 76 characters — Google truncates around 60–70 — so `site.seoTagline`
provides a short form for the title only, leaving the display tagline intact.

## HTML validity

**0 spec violations** across all 15 pages, down from 69 reported errors. Two were
real: a component rendering a `<div>` inside a `<ul>`, and a `<style>` emitted into
`<body>` (it is metadata content — `<head>` only). The rest were stylistic opinions
from the linter, not spec violations, and were correctly ignored.

---

## Verification — the part that matters

A green Lighthouse score proves nothing about whether the site still *works*.
Deferring init, removing a router and gating features by device all break things in
ways the score happily ignores: **a 100 on a page whose menu no longer opens is
worse than the 75 you started with.**

So every interaction is driven for real — **33/33 passing**:

- Menu opens · focus moves in · focus is trapped · `Esc` closes · focus returns to
  the trigger · background `inert`
- Theme toggles and persists
- **No-JS: every `[data-reveal]` is visible** and the preloader is not stuck
- `prefers-reduced-motion`: WebGL and Lenis correctly skipped
- Mobile: WebGL and Lenis correctly skipped
- **No horizontal overflow at 320px**
- CSP enforced on all 6 pages with JS running

## Re-measuring

```bash
npm run build
npx serve dist -l 4399

npx lighthouse http://localhost:4399/ --preset=desktop
npx lighthouse http://localhost:4399/ --form-factor=mobile --screenEmulation.mobile
```

Mobile results are noisy under machine contention — a single run once read 86 when
five consecutive runs all read 98. **Take the median of several runs before
believing a regression.**

The numbers published on the homepage live in `src/data/quality.ts`. **If a change
regresses a score, update them or pull the section** — publishing a figure the site
no longer earns is worse than publishing none.

The reusable audit tooling (contrast checker, eager-vs-deferred bundle reporter,
header checker, HTML validator) is installed globally as the `web-quality-audit`
skill.

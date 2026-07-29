# quiet seven

Marketing site for **quiet seven** — a digital communication studio for branding &
development. Built with [Astro](https://astro.build), Tailwind CSS, GSAP (scroll
animation) and Lenis (smooth scroll). Static output — deploy anywhere.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
├─ layouts/BaseLayout.astro   # <head>, fonts, Nav+Footer, GSAP/Lenis runtime, View Transitions
├─ components/                # Hero, ServicesList, StatsBlock, WorkGrid/WorkCard,
│                             # Testimonials, Marquee, Nav, Footer, Logo, Reveal, SectionHeading
├─ pages/                     # index, services, work/index, work/[slug], about, contact, 404
├─ content/work/*.md          # case studies (one file = one project)
├─ data/                      # site.ts, services.ts, stats.ts, testimonials.ts
└─ styles/global.css          # design tokens + base styles
public/                       # favicon, OG image, placeholder work imagery
```

## Making it yours (swap-in guide)

Everything below is intentionally centralized so a rebrand is a handful of edits.

### Brand name, tagline, contact, nav, socials
Edit **`src/data/site.ts`** — one file drives the wordmark, tagline, email/phone/address,
navigation and social links across every page.

### Colours
Edit the six tokens in **`src/styles/global.css`** (`:root`). Values are **RGB channel
triplets** (e.g. `75 46 255`), which lets Tailwind apply opacity (`bg-accent/10`). To
change the accent, convert your hex to `r g b` and replace `--color-accent`.

### Fonts
Swap the two `@fontsource-variable/*` imports at the top of
**`src/layouts/BaseLayout.astro`**, then update the `fontFamily` entries in
**`tailwind.config.mjs`** to match. Any Google/variable font works via `@fontsource-variable`.

### Logo
Replace the typographic wordmark in **`src/components/Logo.astro`** with an inline `<svg>`
or `<img src="/logo.svg" />` (drop the asset in `public/`).

### Case studies (portfolio)
Add a project by creating a new markdown file in **`src/content/work/`**. Copy the
frontmatter from an existing file — `title, client, category, year, summary, cover,
accent, images[], services[], role, results[], featured, order`. `featured: true`
surfaces it on the homepage; `order` controls sequence. Cover/gallery images are plain
paths into `public/` — replace the placeholder SVGs with real imagery.

### Services / stats / testimonials
Edit the typed data files in **`src/data/`** (`services.ts`, `stats.ts`,
`testimonials.ts`). Stats animate a count-up to the numeric `value`.

### Contact form
The form in **`src/pages/contact.astro`** falls back to a `mailto:` submission. To make
it live, create a form on [Formspree](https://formspree.io) (or similar) and set
`FORM_ENDPOINT` in that file's `<script>` to your endpoint URL — it will then submit via
`fetch` with inline success/error states.

### Deploy config
Set `site` in **`astro.config.mjs`** to your production domain (used for the sitemap and
canonical URLs) before deploying. Output is fully static — host on Vercel, Netlify,
Cloudflare Pages, GitHub Pages, or any static server.

## Accessibility & motion

All animations are gated behind `prefers-reduced-motion: reduce` — reduced-motion users
get a fully static, fully visible site. Content is visible without JavaScript (reveals
default to visible and are only hidden when the animation runtime is active).

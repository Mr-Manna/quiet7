# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **founders and marketing leads at funded startups** who are evaluating studios
for a rebrand plus a build. They arrive mid-evaluation — usually with a competing tab
open, often on mobile, often forwarded a link by a colleague. Their job is to decide
whether this studio is worth a conversation, and success is a qualified enquiry through
`/contact`.

Their decision hinges on two questions the site must answer without being asked: *can
these people actually ship the thing they design*, and *will the result look like us
rather than like their portfolio*.

## Product Purpose

Quiet Seven is a digital communication studio doing branding, digital/product design and
development. This repository is its **marketing site** — the studio's own sales surface
and its largest piece of proof. Success is measured in qualified inbound enquiries, not
traffic.

The site carries a second, unusual burden: it is a work sample. A studio that sells
design-and-build is judged on the craft and engineering of the page the prospect is
standing on.

## Positioning

**Design and build in one team.** The same people who design the work ship the production
code — no handoff to an unnamed dev shop, no translation loss between the comp and the
release. A design-only studio cannot truthfully claim it; a dev shop cannot truthfully
claim the design half.

The site's own measured quality is the natural evidence for this claim (see *Evidence on
Hand*), which is why regressions in its Lighthouse/Core Web Vitals numbers are a
positioning problem, not just a performance one.

## Operating Context

- Prospects evaluate several studios in parallel, frequently on mobile, frequently from a
  link someone else sent them. First viewport does the qualifying.
- The enquiry path is the contact form; there is no booking system, login, or account.
- The studio is remote-first. Time zones and asynchronous review are part of how work
  actually happens with clients.

## Capabilities and Constraints

**Confirmed technical truth (from the codebase):**

- Astro 5, Tailwind 3, GSAP (scroll animation) and Lenis (smooth scroll). Fully **static
  output** — no server runtime, no database, no auth.
- Content is file- and data-driven: case studies as markdown in `src/content/work/`,
  journal posts in `src/content/journal/`, and typed data in `src/data/` (`site.ts`,
  `services.ts`, `stats.ts`, `testimonials.ts`, `principles.ts`, `quality.ts`).
  `src/data/site.ts` is the single source for name, tagline, contact, nav and socials.
- Deployment: GitHub Actions → AWS S3 + CloudFront + Route53 + ACM, provisioned by the
  Terraform in `terraform/` across dev / staging / production. `vercel.json` and
  `scripts/gen-security-headers.mjs` also exist; security headers are generated
  post-build.
- Canonical domain in `astro.config.mjs` is `https://quietseven.com`. The email in
  `site.ts` uses `quietseven.com` — **the two disagree and the real domain is
  undecided.**
- The contact form has **no live endpoint** (`FORM_ENDPOINT` is empty in
  `src/pages/contact.astro`); it currently falls back to `mailto:`. Wiring a real
  endpoint is an open decision.
- Three service pillars are the offering structure: Brand & Identity, Digital & Product
  Design, Development.

**Explicitly undecided:** production domain, live form endpoint, real contact details,
team size, and the actual client roster.

## Brand Commitments

- Name **Quiet Seven**, rendered as the wordmark `quiet` + accented `seven`
  (`src/components/Logo.astro`, `src/data/site.ts`). Binding until the user changes it.
- The name is a promise about the work: restraint, not volume. Copy voice across the site
  is lowercase-leaning, plain-spoken, and unhyperbolic — no exclamation marks, no
  growth-hacking register.
- Tagline in use: *"A digital communication studio for branding & development."*
- Motion is gated behind `prefers-reduced-motion: reduce` throughout, and content renders
  without JavaScript. This is treated as a studio standard, not a nice-to-have.

## Evidence on Hand

**Real:**

- The site's own audited quality, recorded in `src/data/quality.ts` (Lighthouse against
  the production build, July 2026: Performance 100/98, Accessibility 100/100, Best
  practices 100/100, SEO 100/100, plus Core Web Vitals). That file's own instruction —
  keep the numbers honest or pull the section — is a standing rule.
- The engineering artefacts themselves: the Terraform/CI pipeline, generated security
  headers, `docs/web-quality.md`.
- The design-principles content in `src/data/principles.ts` (Hick's, Fitts's, Jakob's,
  Miller's, Von Restorff) — real, citable ideas, not client claims.

**Placeholder — must never be presented as fact:**

- All four case studies (`northwind`, `ledgerline`, `cadence-health`,
  `atlas-mobility`) and every metric inside them, plus the placeholder SVG imagery in
  `public/work/`.
- All three testimonials and the people named in them (Maya Okonkwo, Daniel Reyes, Ines
  Vogel).
- All headline stats: 120+ projects, 9 years in practice, 24 people / seven timezones,
  4.9★ rating.
- Contact details: `hello@quietseven.com`, `+91 94772 86372`, `7 Quietude Lane,
  Suite 700`, and the Kolkata / remote-first location line.
- Social links (all point at bare platform roots).

There is **no real client work, no real testimonial, and no real client metric available
today.** Future work must not invent any, and must not quietly upgrade a placeholder into
a claim. Where proof is structurally required, use the studio's own verifiable
engineering quality — the one thing here that is genuinely measured.

## Product Principles

1. **The site is the portfolio.** Until real client work exists, craft and measured
   engineering quality are the primary proof. Treat a quality regression as a loss of
   evidence.
2. **Never fabricate proof.** No invented clients, quotes, metrics, team sizes, or
   awards. An honest absence beats a convincing fiction; say less instead.
3. **One team, visibly.** Every surface should make the design-and-build unity legible —
   in what is claimed, and in how well the page itself behaves.
4. **Quiet is the method.** Restraint is the differentiator, so expression earns its place
   through precision, not volume. Confidence reads as calm.
5. **Answer the founder's two questions fast.** *Can they ship?* and *will it look like
   us?* — a prospect mid-comparison should get both inside the first viewport.

## Accessibility & Inclusion

WCAG 2.1 AA is the working standard, already held at Lighthouse 100 on desktop and
mobile. Two behaviours are non-negotiable: all motion respects
`prefers-reduced-motion: reduce` (reduced-motion users get a fully static, fully visible
site), and content is readable without JavaScript.

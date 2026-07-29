/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // ── Brand tokens ──────────────────────────────────────────────
      // To rebrand: change the values below. Colours reference CSS vars
      // (defined in src/styles/global.css) so a single edit updates all.
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        // Use for accent-coloured TEXT/ICONS. `accent` (bright lime) is only
        // 1.86:1 on the light bg and fails WCAG AA for text.
        'accent-text': 'rgb(var(--color-accent-text) / <alpha-value>)',
      },
      fontFamily: {
        // The *Fallback faces are metric-matched (size-adjust/ascent-override in
        // BaseLayout) so the webfont swap causes no reflow → no CLS.
        display: ['"Space Grotesk Variable"', '"Grotesk Fallback"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', '"Inter Fallback"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '95rem', // 1520px
      },
      fontSize: {
        // Fluid display sizes (min, preferred, max) — big & tight
        'display-xl': ['clamp(3rem, 9.5vw, 10rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 4.8vw, 4.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        // Signature easing used across hovers/reveals
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

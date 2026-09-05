// ──────────────────────────────────────────────────────────────
// Central site configuration. Edit brand name, tagline, contact
// details, nav and socials here — consumed across every page.
// ──────────────────────────────────────────────────────────────
export const site = {
  name: 'Quiet Seven',
  // Wordmark: "quiet" set light, "seven" set bold, closed with the lime brand
  // dot. `lead` / `accent` are the two words; see Logo.astro for the treatment.
  wordmark: { lead: 'quiet', accent: 'seven' },
  tagline:
    'A digital communication studio for branding & development, now with AI built into how we work.',
  // Short form for the <title> only. The full tagline pushes the homepage title
  // to 76 chars; Google truncates around 60–70, so the tail would be cut off.
  seoTagline: 'AI-assisted digital communication studio',
  description:
    'Quiet Seven is a digital communication studio. We craft brands, digital experiences and the software that carries them — considered, restrained, AI-assisted where it helps, and built to last.',
  email: 'hello@quietseven.com',
  phone: '+91 94772 86372',
  location: 'Remote-first · Kolkata / India',
  address: '',
} as const;

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Journal', href: '/journal' },
  { label: 'Studio', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
] as const;

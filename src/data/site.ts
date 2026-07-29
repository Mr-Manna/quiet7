// ──────────────────────────────────────────────────────────────
// Central site configuration. Edit brand name, tagline, contact
// details, nav and socials here — consumed across every page.
// ──────────────────────────────────────────────────────────────
export const site = {
  name: 'Quiet Seven',
  // The wordmark renders "quiet" + accented "seven"; see Logo.astro
  wordmark: { lead: 'quiet', accent: 'seven' },
  tagline: 'A digital communication studio for branding & development.',
  // Short form for the <title> only. The full tagline pushes the homepage title
  // to 76 chars; Google truncates around 60–70, so the tail would be cut off.
  seoTagline: 'Digital communication studio',
  description:
    'Quiet Seven is a digital communication studio. We craft brands, digital experiences and the software that carries them — considered, restrained, built to last.',
  email: 'hello@quietseven.studio',
  phone: '+1 (555) 070-0007',
  location: 'Remote-first · Kolkata / India',
  address: '7 Quietude Lane, Suite 700',
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

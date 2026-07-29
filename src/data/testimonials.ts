export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'quiet seven translated a decade of messy growth into a brand that finally feels like us — then built the site to match. Rare to find design and engineering this aligned.',
    name: 'Maya Okonkwo',
    role: 'VP Marketing',
    company: 'Northwind',
  },
  {
    quote:
      'They ask better questions than anyone we’ve worked with. The result did the arguing for us in the boardroom.',
    name: 'Daniel Reyes',
    role: 'Founder & CEO',
    company: 'Ledgerline',
  },
  {
    quote:
      'Calm, precise, and genuinely fast. Our app store rating jumped and support tickets dropped after the redesign.',
    name: 'Ines Vogel',
    role: 'Head of Product',
    company: 'Cadence Health',
  },
];

// Marquee keywords / client names shown in the ticker.
export const marqueeItems: string[] = [
  'Branding',
  'Web',
  'Product Design',
  'Development',
  'Motion',
  'Strategy',
  'Native Apps',
  'Design Systems',
];

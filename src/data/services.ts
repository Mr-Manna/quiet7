// The core offerings. Edit copy / add capabilities here.
export interface Service {
  no: string;
  title: string;
  summary: string;
  capabilities: string[];
  tools: string[];
}

export const services: Service[] = [
  {
    no: '01',
    title: 'Brand & Identity',
    summary:
      'We shape how a company looks, speaks and feels — a coherent identity system built to scale across every surface.',
    capabilities: [
      'Brand strategy & positioning',
      'Visual identity & logo systems',
      'Naming & verbal tone',
      'Guidelines & design tokens',
      'Art direction',
    ],
    tools: ['Figma', 'Adobe Suite', 'Blender', 'Cinema 4D'],
  },
  {
    no: '02',
    title: 'Digital & Product Design',
    summary:
      'Websites and product interfaces that are considered down to the pixel — usable, fast, and unmistakably yours.',
    capabilities: [
      'UX research & strategy',
      'Web & marketing sites',
      'Product & app UI',
      'Design systems',
      'Motion & interaction',
    ],
    tools: ['Figma', 'Framer', 'Rive', 'Protopie'],
  },
  {
    no: '03',
    title: 'Development',
    summary:
      'We build what we design — performant front-ends, resilient back-ends, and the native apps in between.',
    capabilities: [
      'Web development',
      'Native & cross-platform apps',
      'Headless CMS & commerce',
      'APIs & integrations',
      'Performance & accessibility',
    ],
    tools: ['React', 'Astro', 'Node', 'Swift', 'Kotlin', 'Flutter'],
  },
  {
    no: '04',
    title: 'Marketing & Media',
    summary:
      'We take the brand to market — campaigns, film and sound that carry the same craft as the identity behind them.',
    capabilities: [
      'Digital marketing & campaigns',
      'Performance & social advertising',
      'Ad films & motion production',
      'Jingles & sonic branding',
      'Content & channel strategy',
    ],
    tools: ['Meta Ads', 'Google Ads', 'Premiere Pro', 'After Effects', 'Ableton Live'],
  },
];

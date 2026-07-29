// Audit results for THIS site — the proof behind the claims on the services
// page. Measured with Lighthouse against the production build (`npm run build`),
// not the dev server.
//
// KEEP THESE HONEST. If a change regresses a score, update the numbers or pull
// the section; publishing a figure the site no longer earns is worse than not
// publishing one at all. Re-measure with:
//   npm run build && npx serve dist -l 4399
//   npx lighthouse http://localhost:4399/ --preset=desktop
export const audited = 'July 2026';

export interface Score {
  label: string;
  desktop: number;
  mobile: number;
}

export const scores: Score[] = [
  { label: 'Performance', desktop: 100, mobile: 98 },
  { label: 'Accessibility', desktop: 100, mobile: 100 },
  { label: 'Best practices', desktop: 100, mobile: 100 },
  { label: 'SEO', desktop: 100, mobile: 100 },
];

export interface Vital {
  metric: string;
  abbr: string;
  desktop: string;
  mobile: string;
  target: string;
}

export const vitals: Vital[] = [
  { metric: 'First Contentful Paint', abbr: 'FCP', desktop: '0.3s', mobile: '1.1s', target: '< 1.2s' },
  { metric: 'Largest Contentful Paint', abbr: 'LCP', desktop: '0.4s', mobile: '1.7s', target: '< 2.0s' },
  { metric: 'Cumulative Layout Shift', abbr: 'CLS', desktop: '0.001', mobile: '0', target: '< 0.1' },
  { metric: 'Time to Interactive', abbr: 'TTI', desktop: '0.4s', mobile: '2.2s', target: '< 2.0s' },
];

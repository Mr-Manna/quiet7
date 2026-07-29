// UX / cognitive-psychology laws we design by. `icon` maps to a key in
// Icon.astro. Add or reorder freely.
export interface Principle {
  law: string;
  headline: string;
  blurb: string;
  icon: string;
}

export const principles: Principle[] = [
  {
    law: "Hick's Law",
    headline: 'Fewer choices, faster action',
    blurb:
      'Every extra option lengthens the time it takes to decide. We reduce and sequence choices so the next step always feels obvious.',
    icon: 'hicks',
  },
  {
    law: "Fitts's Law",
    headline: 'Big, close targets win',
    blurb:
      'The size and distance of a target dictate how quickly people reach it. Primary actions get larger, nearer and unmissable.',
    icon: 'fitts',
  },
  {
    law: "Jakob's Law",
    headline: 'Familiar feels effortless',
    blurb:
      'People spend most of their time on other sites. We honour the patterns they already know, then quietly improve on them.',
    icon: 'jakob',
  },
  {
    law: "Miller's Law",
    headline: 'Chunk it into 7±2',
    blurb:
      'Working memory is small. We group information into digestible chunks so nothing ever overwhelms the reader.',
    icon: 'miller',
  },
  {
    law: 'Von Restorff Effect',
    headline: 'The distinct one is remembered',
    blurb:
      'When items are alike, the odd one out is what sticks. We make the thing that matters visually impossible to miss.',
    icon: 'restorff',
  },
  {
    law: 'Aesthetic–Usability',
    headline: 'Beautiful feels more usable',
    blurb:
      'People perceive good-looking design as easier to use — and forgive small flaws. Craft is not decoration; it earns trust.',
    icon: 'aesthetic',
  },
];

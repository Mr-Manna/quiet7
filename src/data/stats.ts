// Headline metrics. `value` is the numeric target for the count-up
// animation; `suffix` is appended (e.g. "+", "%", "★").
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Projects shipped' },
  { value: 9, suffix: '', label: 'Years in practice' },
  { value: 24, suffix: '', label: 'People, seven timezones' },
  { value: 4.9, suffix: '★', label: 'Average client rating' },
];

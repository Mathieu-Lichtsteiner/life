export const Interval = {
  // Day: 'day',
  // Week: 'week',
  Month: 'month',
  Year: 'year'
} as const;

export type Interval = (typeof Interval)[keyof typeof Interval];

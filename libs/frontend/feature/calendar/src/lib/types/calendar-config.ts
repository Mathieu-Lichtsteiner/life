import { Interval } from './interval';

export interface CalendarConfig {
  readonly startDate: Date;
  readonly interval: Interval;
  readonly duration: number;
}

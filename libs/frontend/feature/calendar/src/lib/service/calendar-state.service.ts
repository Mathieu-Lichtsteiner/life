import { Injectable } from '@angular/core';
import { ReplaySubject, filter, map } from 'rxjs';
import { CalendarConfig } from '../types/calendar-config';
import { DotsConfig } from '../types/dots-config';
import { Interval } from '../types/interval';

@Injectable()
export class CalendarStateService {
  private readonly _calendarConfig$ = new ReplaySubject<CalendarConfig>();

  public readonly dotsConfig$ = this._calendarConfig$.pipe(
    map((calendarConfig) => {
      const columnCount = this.getColumnCountForInterval(
        calendarConfig.interval
      );
      return { columnCount } as DotsConfig;
    })
  );

  public readonly dots$ = this._calendarConfig$.pipe(
    filter(
      (config) => !!config.startDate && !!config.interval && !!config.duration
    ),
    map((config) => {
      const todaysIndex = this.intervalsInDuration(
        config.interval,
        config.startDate,
        new Date()
      );
      const endDate = new Date(
        config.startDate.getFullYear() + config.duration,
        config.startDate.getMonth(),
        config.startDate.getDate()
      );
      const points = new Array(
        this.intervalsInDuration(config.interval, config.startDate, endDate)
      );
      points.fill({ isPast: true }, 0, todaysIndex);
      points.fill({ isPast: false }, todaysIndex, points.length);
      return points;
    })
  );

  public setCalendarConfig(config: CalendarConfig): void {
    this._calendarConfig$.next(config);
  }

  private getColumnCountForInterval(interval: Interval): number {
    switch (interval) {
      // case Interval.Day:
      //   return 365;
      // case Interval.Week:
      //   return 52;
      case Interval.Month:
        return 12;
      case Interval.Year:
        return 1;
    }
  }

  private intervalsInDuration(
    interval: Interval,
    start: Date,
    end: Date
  ): number {
    const days = this.getDaysFromMs(end.getTime() - start.getTime());
    switch (interval) {
      // case Interval.Day:
      //   return days;
      // case Interval.Week:
      //   return Math.floor(days / 7);
      case Interval.Month:
        return Math.floor(days / 30);
      case Interval.Year:
        return Math.floor(days / 365);
    }
  }

  private getDaysFromMs(ms: number): number {
    const seconds = Math.floor(ms / 1_000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return days;
  }
}

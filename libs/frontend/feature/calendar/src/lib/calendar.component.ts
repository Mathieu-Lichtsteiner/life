import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReplaySubject, combineLatest, filter, map, tap } from 'rxjs';
import { InputComponent } from './ui/input.component';
import { Interval } from './types/interval';

@Component({
  standalone: true,
  imports: [CommonModule, InputComponent],
  template: `
    <life-input
      (startDateChanged)="setStartDate($event)"
      (intervalChanged)="setInterval($event)"
      (durationChanged)="setDuration($event)"></life-input>
    <ul
      *ngIf="this.calendarConfig$ | async as config; else noData"
      class="grid grid-flow-row gap-3"
      [ngStyle]="{
        'grid-template-columns': 'repeat(' + config.cols + ', auto)'
      }">
      <li
        *ngFor="let point of config.points"
        class="rounded-full aspect-square h-3"
        [ngClass]="point.isPast ? 'bg-gray-600' : 'bg-gray-300'"></li>
    </ul>

    <ng-template #noData>
      <p>No data</p>
    </ng-template>
  `,
  styles: [
    `
      :host {
        @apply container mx-auto px-3 flex flex-col gap-3 w-min;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  private readonly _startDateSubject$ = new ReplaySubject<Date>();
  private readonly _intervalSubject$ = new ReplaySubject<Interval>();
  private readonly _durationSubject$ = new ReplaySubject<number>();

  protected readonly calendarConfig$ = combineLatest([
    this._startDateSubject$,
    this._intervalSubject$,
    this._durationSubject$
  ]).pipe(
    tap(console.log),
    filter(
      ([startDate, interval, duration]) =>
        !!startDate && !!interval && !!duration
    ),
    map(([startDate, interval, duration]) => {
      const todaysIndex = this.intervalsInDuration(
        interval,
        startDate,
        new Date()
      );
      const endDate = new Date(
        startDate.getFullYear() + duration,
        startDate.getMonth(),
        startDate.getDate()
      );
      const points = new Array(
        this.intervalsInDuration(interval, startDate, endDate)
      );
      points.fill({ isPast: true }, 0, todaysIndex);
      points.fill({ isPast: false }, todaysIndex, points.length);
      return { points, cols: this.getColumnCountForInterval(interval) };
    })
  );

  protected setStartDate(date: Date) {
    this._startDateSubject$.next(date);
  }

  protected setInterval(interval: Interval) {
    this._intervalSubject$.next(interval);
  }

  protected setDuration(duration: number) {
    this._durationSubject$.next(duration);
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

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul
      *ngIf="this.points$ | async as points"
      class="grid grid-flow-row grid-cols-[repeat(12,auto)] gap-3 w-min mx-auto">
      <li
        *ngFor="let point of points"
        class="rounded-full aspect-square h-3"
        [ngClass]="point.isPast ? 'bg-gray-600' : 'bg-gray-300'"></li>
    </ul>
  `,
  styles: [
    `
      :host {
        @apply block container mx-auto px-3;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontendFeatureCalendarComponent {
  private readonly _startDate$ = of(new Date(2000, 5, 7));

  protected readonly points$ = this._startDate$.pipe(
    map((startDate) => {
      const todaysIndex = this.durationInDays(startDate, new Date());
      const endDate = new Date(
        startDate.getFullYear() + 100,
        startDate.getMonth(),
        startDate.getDay()
      );
      const points = new Array(this.durationInDays(startDate, endDate));
      points.fill({ isPast: true }, 0, todaysIndex);
      points.fill({ isPast: false }, todaysIndex, points.length);
      return points;
    })
  );

  private durationInDays(start: Date, end: Date) {
    return this.getIntervallsFromMs(end.getTime() - start.getTime());
  }

  private getIntervallsFromMs(ms: number): number {
    const seconds = Math.floor(ms / 1_000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    return months;
  }
}

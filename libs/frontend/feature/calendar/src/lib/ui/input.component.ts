import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Interval } from '../types/interval';

@Component({
  selector: 'calendar-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- TODO test for initial value -->
    <label for="startDate">Start Date</label>
    <input
      id="startDate"
      type="date"
      [(ngModel)]="this.startDate"
      value="{{ this.startDate | date : 'yyyy-MM-dd' }}" />

    <label for="interval">Interval</label>
    <select id="interval" [(ngModel)]="this.interval">
      <option *ngFor="let interval of this.intervals" [value]="interval">
        {{ interval }}
      </option>
    </select>

    <label for="duration">Duration in Years</label>
    <!-- TODO validate minValue = today - start in years -->
    <input id="duration" type="number" [(ngModel)]="this.duration" />
  `,
  styles: [
    `
      :host {
        @apply flex flex-col gap-3;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  protected readonly intervals = Object.values(Interval);

  private readonly _startDateChanged = new BehaviorSubject<Date>(
    new Date(2000, 6, 5)
  );
  private readonly _intervalChanged = new BehaviorSubject<Interval>(
    Interval.Month
  );
  private readonly _durationChanged = new BehaviorSubject<number>(100);

  protected get startDate(): Date {
    return this._startDateChanged.getValue();
  }
  protected set startDate(value: Date) {
    this._startDateChanged.next(value);
  }
  protected get interval(): Interval {
    return this._intervalChanged.getValue();
  }
  protected set interval(value: Interval) {
    this._intervalChanged.next(value);
  }
  protected get duration() {
    return this._durationChanged.getValue();
  }
  protected set duration(value: number) {
    if (value <= 0) {
      return;
    }
    this._durationChanged.next(value);
  }

  @Output()
  public readonly startDateChanged = this._startDateChanged.asObservable();
  @Output()
  public readonly intervalChanged = this._intervalChanged.asObservable();
  @Output()
  public readonly durationChanged = this._durationChanged.asObservable();
}

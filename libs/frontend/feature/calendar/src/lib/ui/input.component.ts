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
    <label for="startDate">Start Date</label>
    <!-- TODO somehow the initial value is not displayed -->
    <input id="startDate" type="date" [(ngModel)]="this.startDate" />
    <label for="interval">Interval</label>
    <select [(ngModel)]="this.interval">
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
  private _startDate: Date = new Date(2000, 5, 7);
  private _interval: Interval = Interval.Month;
  private _duration = 100;

  protected readonly intervals = Object.values(Interval);

  private readonly _startDateChanged = new BehaviorSubject<Date>(
    this._startDate
  );
  private readonly _intervalChanged = new BehaviorSubject<Interval>(
    this._interval
  );
  private readonly _durationChanged = new BehaviorSubject<number>(
    this._duration
  );

  protected get startDate(): Date {
    return this._startDate;
  }
  protected set startDate(value: Date) {
    this._startDate = value;
    this._startDateChanged.next(value);
  }
  protected get interval(): Interval {
    return this._interval;
  }
  protected set interval(value: Interval) {
    this._interval = value;
    this._intervalChanged.next(value);
  }
  protected get duration() {
    return this._duration;
  }
  protected set duration(value) {
    if (value <= 0) {
      return;
    }
    this._duration = value;
    this._durationChanged.next(value);
  }

  @Output()
  public readonly startDateChanged = this._startDateChanged.asObservable();
  @Output()
  public readonly intervalChanged = this._intervalChanged.asObservable();
  @Output()
  public readonly durationChanged = this._durationChanged.asObservable();
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { CalendarStateService } from './calendar-state.service';
import { CalendarConfig } from './types/calendar-config';
import { DotsComponent } from './ui/dots.component';
import { InputComponent } from './ui/input.component';

@Component({
  standalone: true,
  imports: [CommonModule, InputComponent, DotsComponent],
  providers: [CalendarStateService],
  template: `
    <calendar-input (configChanged)="setCalendarConfig($event)" />

    <calendar-dots
      *ngIf="this.dotsViewModel$ | async as vm; else noData"
      [config]="vm.config"
      [dots]="vm.dots" />

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
  private readonly calendarService = inject(CalendarStateService);

  protected readonly dotsViewModel$ = combineLatest([
    this.calendarService.dotsConfig$,
    this.calendarService.dots$
  ]).pipe(map(([config, dots]) => ({ config, dots })));

  protected setCalendarConfig(config: CalendarConfig): void {
    this.calendarService.setCalendarConfig(config);
  }
}

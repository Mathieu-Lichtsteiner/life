import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DotsConfig } from '../types/dots-config';
import { Dot } from '../types/point';

@Component({
  selector: 'calendar-dots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul
      class="grid grid-flow-row gap-3"
      [ngStyle]="{
        'grid-template-columns': 'repeat(' + config.columnCount + ', auto)'
      }">
      <li
        *ngFor="let dot of dots"
        class="rounded-full aspect-square h-3"
        [ngClass]="dot.isPast ? 'bg-gray-600' : 'bg-gray-300'"></li>
    </ul>
  `,
  styles: [
    `
      :host {
        @appply block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotsComponent {
  @Input({ required: true })
  public config!: DotsConfig;

  @Input({ required: true })
  public dots!: Dot[];
}

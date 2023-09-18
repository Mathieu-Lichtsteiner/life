import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'life-fe-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `<p>fe-calendar works!</p>`,
  styles: [
    `
      :host {
        @apply block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontendFeatureCalendarComponent {}

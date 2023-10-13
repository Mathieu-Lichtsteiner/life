import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'charts-segment',
  standalone: true,
  imports: [CommonModule],
  template: `<p>segment works!</p>`,
  styles: [
    `
      :host {
        @apply block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentComponent {}

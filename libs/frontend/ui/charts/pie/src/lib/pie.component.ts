import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'charts-pie',
  standalone: true,
  imports: [CommonModule],
  template: `<p>pie works!</p>`,
  styles: [
    `
      :host {
        @apply block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieComponent {}

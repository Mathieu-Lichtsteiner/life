import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'life-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<p>pie-chart works!</p>`,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {}

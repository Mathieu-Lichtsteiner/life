import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'life-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<p>tooltip works!</p>`,
  styles: [
    `
      :host {
        @apply block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {}

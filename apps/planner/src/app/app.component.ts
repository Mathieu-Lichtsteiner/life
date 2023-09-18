import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'life-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        @apply block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}

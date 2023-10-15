import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { tap } from 'rxjs';
import { ApiRequest } from '../types/api-request';

@Component({
  selector: 'api-request',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container
      *ngIf="
        current$ | async as current;
        else loadingTemplate ?? defaultLoadingTemplate
      ">
      <ng-container [ngSwitch]="current.state">
        <ng-container *ngSwitchCase="'success'">
          <ng-content />
        </ng-container>

        <ng-container *ngSwitchCase="'error'">
          <ng-container
            *ngTemplateOutlet="errorTemplate ?? defaultErrorTemplate" />
        </ng-container>

        <ng-container *ngSwitchCase="'loading'">
          <ng-container
            *ngTemplateOutlet="loadingTemplate ?? defaultLoadingTemplate" />
        </ng-container>
      </ng-container>
    </ng-container>

    <ng-template #defaultErrorTemplate>
      <div>
        <em> An error occured </em>
        <button (click)="this.reload()" [disabled]="this.loading">
          Reload
        </button>
      </div>
    </ng-template>

    <ng-template #defaultLoadingTemplate>
      <div>
        <em> Loading </em>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `
  ]
})
export class ApiRequestComponent<T> {
  private _loading = false;

  @Input({ required: true })
  public request!: ApiRequest<T>;

  @Input()
  public errorTemplate: TemplateRef<T> | null = null;

  @Input()
  public loadingTemplate: TemplateRef<string> | null = null;

  // TODO this side effect is not ideal, i would prefer a pure pipe
  protected readonly current$ = this.request.currentRequest$.pipe(
    tap(() => (this._loading = false))
  );

  protected get loading() {
    return this._loading;
  }

  protected reload() {
    if (this._loading) {
      return;
    }
    this._loading = true;
    this.request.resend();
  }
}

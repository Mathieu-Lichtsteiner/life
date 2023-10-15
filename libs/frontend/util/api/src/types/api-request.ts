import {
  Observable,
  Subject,
  catchError,
  map,
  mergeMap,
  of,
  shareReplay,
  startWith
} from 'rxjs';
import { ApiResult } from './api-result';

export class ApiRequest<T> {
  private readonly reloadSubject = new Subject<void>();

  constructor(private readonly httpRequest: Observable<T>) {}

  public readonly currentRequest$: Observable<ApiResult<T>> =
    this.reloadSubject.pipe(
      startWith(undefined),
      map(() => ({ state: 'loading' as const })),
      mergeMap(() =>
        this.httpRequest.pipe(
          map((data) => ({ state: 'success' as const, data })),
          catchError((error) => of({ state: 'error' as const, error }))
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public resend(): void {
    this.reloadSubject.next();
  }
}

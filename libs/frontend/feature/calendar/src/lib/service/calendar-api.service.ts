import { Injectable, inject } from '@angular/core';
import { ApiEndpointService } from '@life/fe/util/api';

@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {
  private readonly apiEndpointService = inject(ApiEndpointService);
}

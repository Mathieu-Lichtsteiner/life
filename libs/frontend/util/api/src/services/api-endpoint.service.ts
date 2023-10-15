import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../tokens/base-url';
import { ApiEndpoint } from '../types/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {
  private httpClient = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  public createEndpoint<Entity, CreateDto>(
    path: string
  ): ApiEndpoint<Entity, CreateDto> {
    return new ApiEndpoint<Entity, CreateDto>(
      this.httpClient,
      this.baseUrl,
      path
    );
  }
}

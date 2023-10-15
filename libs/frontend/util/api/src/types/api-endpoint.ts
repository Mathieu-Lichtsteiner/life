import { HttpClient } from '@angular/common/http';
import { ApiRequest } from './api-request';

export class ApiEndpoint<Entity, CreateDto> {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string,
    private readonly path: string
  ) {}

  public post(body: CreateDto): ApiRequest<string> {
    if (!body) {
      throw new Error('body is required');
    }
    return new ApiRequest(
      this.httpClient.post<string>(this.getEndpoint(), body)
    );
  }

  public get(): ApiRequest<Entity[]> {
    return new ApiRequest(this.httpClient.get<Entity[]>(this.getEndpoint()));
  }

  public getById(hashId: string): ApiRequest<Entity> {
    if (!hashId) {
      throw new Error('hashId is required');
    }
    return new ApiRequest(
      this.httpClient.get<Entity>(this.getEndpoint(hashId))
    );
  }

  public put(body: CreateDto): ApiRequest<string> {
    if (!body) {
      throw new Error('body is required');
    }
    return new ApiRequest(
      this.httpClient.put<string>(this.getEndpoint(), body)
    );
  }

  public patch(body: Partial<CreateDto>): ApiRequest<string> {
    if (!body) {
      throw new Error('body is required');
    }
    return new ApiRequest(
      this.httpClient.patch<string>(this.getEndpoint(), body)
    );
  }

  public delete(hashId: string): ApiRequest<boolean> {
    if (!hashId) {
      throw new Error('hashId is required');
    }
    return new ApiRequest(
      this.httpClient.delete<boolean>(this.getEndpoint(hashId))
    );
  }

  private getEndpoint(hashId?: string): string {
    const endpointUrl = `${this.baseUrl}/${this.path}`;
    if (hashId) {
      return `${endpointUrl}/${hashId}`;
    } else {
      return endpointUrl;
    }
  }
}

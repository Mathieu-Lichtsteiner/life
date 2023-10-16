import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiEndpointService } from './api-endpoint.service';
import { BASE_URL } from '../tokens/base-url';

describe(ApiEndpointService.name, () => {
  let service: ApiEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_URL,
          useValue: './'
        }
      ]
    });
    service = TestBed.inject(ApiEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

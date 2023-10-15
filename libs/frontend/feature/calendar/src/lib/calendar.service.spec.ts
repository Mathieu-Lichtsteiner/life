import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe(CalendarService.name, () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

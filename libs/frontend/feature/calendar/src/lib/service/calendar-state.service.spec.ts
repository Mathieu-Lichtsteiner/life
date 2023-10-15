import { TestBed } from '@angular/core/testing';

import { CalendarStateService } from './calendar-state.service';

describe(CalendarStateService.name, () => {
  let service: CalendarStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

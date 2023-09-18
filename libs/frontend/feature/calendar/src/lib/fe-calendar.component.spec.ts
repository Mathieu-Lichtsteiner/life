import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendFeatureCalendarComponent } from './fe-calendar.component';

describe('FrontendFeatureCalendarComponent', () => {
  let component: FrontendFeatureCalendarComponent;
  let fixture: ComponentFixture<FrontendFeatureCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendFeatureCalendarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendFeatureCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

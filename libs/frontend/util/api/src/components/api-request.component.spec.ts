import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiRequestComponent } from './api-request.component';

describe(ApiRequestComponent.name, () => {
  let component: ApiRequestComponent<unknown>;
  let fixture: ComponentFixture<ApiRequestComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiRequestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

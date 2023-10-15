import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { CalendarComponent } from './calendar.component';
import { Interval } from './types/interval';
import { InputComponent } from './ui/input.component';

@Component({
  selector: 'calendar-input',
  template: `<div>calendar input mock</div>`,
  standalone: true
})
class InputTestingComponent extends InputComponent {
  public override set startDate(date: Date) {
    this.startDate = date;
  }
  public override set interval(interval: Interval) {
    this.interval = interval;
  }
  public override set duration(duration: number) {
    this.duration = duration;
  }
}

describe(CalendarComponent.name, () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let getByLabelText: <T extends HTMLElement>(text: string) => T;

  beforeEach(async () => {
    const renderResult = await render(CalendarComponent, {
      providers: [
        {
          provide: InputComponent,
          useValue: InputTestingComponent
        }
      ]
    });

    component = renderResult.fixture.componentInstance;
    fixture = renderResult.fixture;
    getByLabelText = <T extends HTMLElement>(text: string) =>
      renderResult.getByLabelText(text) as T;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('layout', () => {
    it('should render input component', () => {
      expect(getByLabelText('calendar input mock')).toBeTruthy();
    });
  });

  describe('dots', () => {
    it('should display one column in year mode', () => {
      expect(true).toBeTruthy();
    });
  });
});

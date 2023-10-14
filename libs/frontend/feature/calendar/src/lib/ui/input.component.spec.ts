import { ComponentFixture } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { fireEvent, render } from '@testing-library/angular';
import { InputComponent } from './input.component';

const { input, change } = fireEvent;

describe(InputComponent.name, () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let getByLabelText: <T extends HTMLElement>(text: string) => T;

  beforeEach(async () => {
    const renderResult = await render(InputComponent);

    component = renderResult.fixture.componentInstance;
    fixture = renderResult.fixture;
    getByLabelText = <T extends HTMLElement>(text: string) =>
      renderResult.getByLabelText(text) as T;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering of input fields', () => {
    it("should render 'Start Date' label", () => {
      expect(getByLabelText('Start Date')).toBeTruthy();
    });
    it('should render start date input', () => {
      expect(getByLabelText('Start Date')).toBeTruthy();
    });
    it("should render 'Interval' label", () => {
      expect(getByLabelText('Interval')).toBeTruthy();
    });
    it('should render interval select', () => {
      expect(getByLabelText('Interval')).toBeTruthy();
    });
    it("should render 'Duration in Years' label", () => {
      expect(getByLabelText('Duration in Years')).toBeTruthy();
    });
    it('should render duration input', () => {
      expect(getByLabelText('Duration in Years')).toBeTruthy();
    });
  });

  it('should emit startDateChanged event when start date is changed', () => {
    // ARRANGE
    const newDate = new Date(1, 1, 1);
    const startDateInput = getByLabelText<HTMLInputElement>('Start Date');
    const startDateSpy = subscribeSpyTo(component.startDateChanged);

    // ACT
    input(startDateInput, {
      target: { value: dateString(newDate) }
    });
    startDateSpy.complete();
    fixture.detectChanges();

    // ASSERT
    expect(startDateSpy.receivedNext()).toBeTruthy();
    const receivedDate = startDateSpy.getLastValue();
    expect(receivedDate).toBeTruthy();
    // @ts-expect-error the test will fail if the recieved date is null, so we can safely ignore this
    expect(dateString(receivedDate)).toEqual(dateString(newDate));
  });

  it('should emit intervalChanged event when interval is changed', () => {
    // ARRANGE
    const newInterval = 'year';
    const intervalSelect = getByLabelText<HTMLSelectElement>('Interval');
    const intervalSpy = subscribeSpyTo(component.intervalChanged);

    // ACT
    change(intervalSelect, { target: { value: newInterval } });
    intervalSpy.complete();
    fixture.detectChanges();

    // ASSERT
    expect(intervalSpy.receivedNext()).toBeTruthy();
    expect(intervalSpy.getLastValue()).toEqual(newInterval);
  });

  it('should emit durationChanged event when duration is changed', () => {
    // ARRANGE
    const newDuration = 5;
    const durationInput = getByLabelText<HTMLInputElement>('Duration in Years');
    const durationSpy = subscribeSpyTo(component.durationChanged);

    // ACT
    input(durationInput, { target: { value: newDuration } });
    durationSpy.complete();
    fixture.detectChanges();

    // ASSERT
    expect(durationSpy.receivedNext()).toBeTruthy();
    expect(durationSpy.getLastValue()).toEqual(newDuration);
  });
});

function dateString(value: Date): string {
  return value.toISOString().split('T')[0];
}

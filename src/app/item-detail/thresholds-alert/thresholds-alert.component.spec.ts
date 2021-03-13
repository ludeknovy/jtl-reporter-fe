import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdsAlertComponent } from './thresholds-alert.component';

describe('RegressionAlertComponent', () => {
  let component: ThresholdsAlertComponent;
  let fixture: ComponentFixture<ThresholdsAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThresholdsAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

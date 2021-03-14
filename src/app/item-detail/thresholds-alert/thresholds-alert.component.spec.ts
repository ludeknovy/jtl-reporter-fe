import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ThresholdsAlertComponent } from './thresholds-alert.component';

describe('ThresholdAlertComponent', () => {
  let component: ThresholdsAlertComponent;
  let fixture: ComponentFixture<ThresholdsAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdsAlertComponent],
      imports: [NgbModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdsAlertComponent);
    component = fixture.componentInstance;
    component.itemData = {
      thresholds: {
        thresholds: {
          percentile: 10
        },
        result: {
          percentile: {
            passed: true
          },
          throughput: {

          },
          errorRate: {

          }
        }
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

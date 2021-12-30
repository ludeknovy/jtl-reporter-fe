import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AddMetricComponent } from './add-metric.component';

describe('AddMetricComponent', () => {
  let component: AddMetricComponent;
  let fixture: ComponentFixture<AddMetricComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddMetricComponent],
      imports: [FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMetricComponent);
    component = fixture.componentInstance;
    component.chartLines = {
      labels: new Map([['test', [{ name: 'test' }]]]),
      overall: new Map()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

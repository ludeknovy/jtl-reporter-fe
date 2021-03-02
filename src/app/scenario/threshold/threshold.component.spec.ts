import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ThresholdComponent } from './threshold.component';

describe('ThresholdComponent', () => {
  let component: ThresholdComponent;
  let fixture: ComponentFixture<ThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdComponent],
      imports: [ReactiveFormsModule, HttpClientModule],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdComponent);
    component = fixture.componentInstance;
    component.params = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

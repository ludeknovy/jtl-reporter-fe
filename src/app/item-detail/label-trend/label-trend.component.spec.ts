import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTrendComponent } from './label-trend.component';

describe('LabelTrendComponent', () => {
  let component: LabelTrendComponent;
  let fixture: ComponentFixture<LabelTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

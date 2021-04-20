import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatsCompareComponent } from './request-stats-compare.component';

describe('RequestStatsCompareComponent', () => {
  let component: RequestStatsCompareComponent;
  let fixture: ComponentFixture<RequestStatsCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStatsCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

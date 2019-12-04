import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringStatsComponent } from './monitoring-stats.component';

describe('MonitoringStatsComponent', () => {
  let component: MonitoringStatsComponent;
  let fixture: ComponentFixture<MonitoringStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

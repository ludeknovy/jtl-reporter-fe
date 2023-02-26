import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioTrendsSettingsComponent } from './scenario-trends-settings.component';

describe('ScenarioTrendsSettingsComponent', () => {
  let component: ScenarioTrendsSettingsComponent;
  let fixture: ComponentFixture<ScenarioTrendsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioTrendsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTrendsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

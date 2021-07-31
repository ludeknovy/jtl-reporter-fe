import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsConfigComponent } from './stats-config.component';

describe('StatsConfigComponent', () => {
  let component: StatsConfigComponent;
  let fixture: ComponentFixture<StatsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

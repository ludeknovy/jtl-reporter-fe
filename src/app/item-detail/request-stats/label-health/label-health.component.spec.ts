import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelHealthComponent } from './label-health.component';

describe('StatusCodeDistributionComponent', () => {
  let component: LabelHealthComponent;
  let fixture: ComponentFixture<LabelHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

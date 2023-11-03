import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioShareTokenComponent } from './scenario-share-token.component';

describe('ShareTokenComponent', () => {
  let component: ScenarioShareTokenComponent;
  let fixture: ComponentFixture<ScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioShareTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

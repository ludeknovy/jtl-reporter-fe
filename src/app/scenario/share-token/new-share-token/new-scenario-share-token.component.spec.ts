import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScenarioShareTokenComponent } from './new-scenario-share-token.component';

describe('NewShareTokenComponent', () => {
  let component: NewScenarioShareTokenComponent;
  let fixture: ComponentFixture<NewScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewScenarioShareTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScenarioShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

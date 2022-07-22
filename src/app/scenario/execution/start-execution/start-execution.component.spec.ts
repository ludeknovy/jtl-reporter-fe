import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExecutionComponent } from './start-execution.component';

describe('StartExecutionComponent', () => {
  let component: StartExecutionComponent;
  let fixture: ComponentFixture<StartExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

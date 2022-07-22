import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionFilesComponent } from './execution-files.component';

describe('ExecutionFilesComponent', () => {
  let component: ExecutionFilesComponent;
  let fixture: ComponentFixture<ExecutionFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

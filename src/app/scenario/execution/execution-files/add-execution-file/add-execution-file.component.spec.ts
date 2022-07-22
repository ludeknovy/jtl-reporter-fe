import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExecutionFileComponent } from './add-execution-file.component';

describe('AddExecutionFileComponent', () => {
  let component: AddExecutionFileComponent;
  let fixture: ComponentFixture<AddExecutionFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExecutionFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExecutionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExecutionFileComponent } from './delete-execution-file.component';

describe('DeleteExecutionFileComponent', () => {
  let component: DeleteExecutionFileComponent;
  let fixture: ComponentFixture<DeleteExecutionFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExecutionFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExecutionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

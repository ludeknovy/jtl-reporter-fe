import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroErrorToleranceWarningComponent } from './zero-error-tolerance-warning.component';

describe('ZeroErrorToleranceWarningComponent', () => {
  let component: ZeroErrorToleranceWarningComponent;
  let fixture: ComponentFixture<ZeroErrorToleranceWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZeroErrorToleranceWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroErrorToleranceWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

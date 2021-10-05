import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCodeDistributionComponent } from './status-code-distribution.component';

describe('StatusCodeDistributionComponent', () => {
  let component: StatusCodeDistributionComponent;
  let fixture: ComponentFixture<StatusCodeDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCodeDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCodeDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

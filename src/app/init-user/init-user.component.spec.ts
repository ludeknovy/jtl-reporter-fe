import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitUserComponent } from './init-user.component';

describe('InitUserComponent', () => {
  let component: InitUserComponent;
  let fixture: ComponentFixture<InitUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

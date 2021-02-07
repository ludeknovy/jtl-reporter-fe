import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExternalNotificationComponent } from './add-new-external-notification.component';

describe('AddNewExternalNotificationComponent', () => {
  let component: AddNewExternalNotificationComponent;
  let fixture: ComponentFixture<AddNewExternalNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewExternalNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewExternalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExternalNotificationComponent } from './delete-external-notification.component';

describe('DeleteExternalNotificationComponent', () => {
  let component: DeleteExternalNotificationComponent;
  let fixture: ComponentFixture<DeleteExternalNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExternalNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExternalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DeleteExternalNotificationComponent } from './delete-external-notification.component';

describe('DeleteExternalNotificationComponent', () => {
  let component: DeleteExternalNotificationComponent;
  let fixture: ComponentFixture<DeleteExternalNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExternalNotificationComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
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

import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AddNewExternalNotificationComponent } from './add-new-external-notification.component';

describe('AddNewExternalNotificationComponent', () => {
  let component: AddNewExternalNotificationComponent;
  let fixture: ComponentFixture<AddNewExternalNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewExternalNotificationComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
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

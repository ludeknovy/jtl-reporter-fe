import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from '@rushvora/ng-datatable';
import { AddNewExternalNotificationComponent } from './add-new-external-notification/add-new-external-notification.component';
import { DeleteExternalNotificationComponent } from './delete-external-notification/delete-external-notification.component';

import { ExternalNotificationComponent } from './external-notification.component';

describe('ExternalNotificationComponent', () => {
  let component: ExternalNotificationComponent;
  let fixture: ComponentFixture<ExternalNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalNotificationComponent,
        AddNewExternalNotificationComponent,
        DeleteExternalNotificationComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule, DataTableModule],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

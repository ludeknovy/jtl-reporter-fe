import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScenarioComponent } from './scenario.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { SettingsScenarioComponent } from './scenario-settings/scenario-settings.component';
import { DeleteScenarioComponent } from './delete-scenario/delete-scenario.component';
import { ControlPanelComponent } from '../shared/control-panel/control-panel.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTableModule} from '@pascalhonegger/ng-datatable';
import { ExternalNotificationComponent } from './external-notification/external-notification.component';
import { ScenarioTrendsComponent } from './scenario-trends/scenario-trends.component';
import { HttpRequestInterceptorMock } from '../_interceptors/mock-interceptior';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScenarioComponent', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScenarioComponent,
        BreadcrumbComponent,
        AddNewItemComponent,
        SettingsScenarioComponent,
        DeleteScenarioComponent,
        ControlPanelComponent,
        ExternalNotificationComponent,
        ScenarioTrendsComponent,
      ],
      imports: [
        NgxSpinnerModule,
        DataTableModule,
        NgbModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptorMock,
        multi: true
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

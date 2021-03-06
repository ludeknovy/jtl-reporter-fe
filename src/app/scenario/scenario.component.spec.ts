import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComponent } from './scenario.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { SettingsScenarioComponent } from './scenario-settings/scenario-settings.component';
import { DeleteScenarioComponent } from './delete-scenario/delete-scenario.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { ScenarioGraphComponent } from './graphs/scenario-graph.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from '@rushvora/ng-datatable';
import { ExternalNotificationComponent } from './external-notification/external-notification.component';

describe('ScenarioComponent', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScenarioComponent,
        BreadcrumbComponent,
        AddNewItemComponent,
        SettingsScenarioComponent,
        DeleteScenarioComponent,
        ControlPanelComponent,
        ScenarioGraphComponent,
        ExternalNotificationComponent,
      ],
      imports: [
        NgxSpinnerModule,
        DataTableModule,
        NgbModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ]
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

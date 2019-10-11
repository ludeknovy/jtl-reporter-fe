import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioComponent } from './scenario.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { EditScenarioComponent } from './edit-scenario/edit-scenario.component';
import { DeleteScenarioComponent } from './delete-scenario/delete-scenario.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { ScenarioGraphComponent } from './graphs/scenario-graph.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ScenarioComponent', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScenarioComponent,
        BreadcrumbComponent,
        AddNewItemComponent,
        EditScenarioComponent,
        DeleteScenarioComponent,
        ControlPanelComponent,
        ScenarioGraphComponent
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

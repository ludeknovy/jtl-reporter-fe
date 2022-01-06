import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScenarioComponent} from './scenario.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {AddNewItemComponent} from './add-new-item/add-new-item.component';
import {ScenarioTrendsComponent} from './scenario-trends/scenario-trends.component';
import {SettingsScenarioComponent} from './scenario-settings/scenario-settings.component';
import {DeleteScenarioComponent} from './delete-scenario/delete-scenario.component';
import {ExternalNotificationComponent} from './external-notification/external-notification.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {HighchartsChartModule} from 'highcharts-angular';
import {ItemControlsComponent} from './item-controls/item-controls.component';
import {SharedItemModule} from '../shared/shared-item/shared-item.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from '@pascalhonegger/ng-datatable';
import {
  AddNewExternalNotificationComponent
} from './external-notification/add-new-external-notification/add-new-external-notification.component';
import {
  DeleteExternalNotificationComponent
} from './external-notification/delete-external-notification/delete-external-notification.component';


const routes: Routes = [
  {
    path: 'project/:projectName/scenario/:scenarioName/items', component: ScenarioComponent,
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard]
  },

];

@NgModule({
  declarations: [ScenarioComponent, AddNewItemComponent, ScenarioTrendsComponent,
    SettingsScenarioComponent, DeleteScenarioComponent, ExternalNotificationComponent,
    ItemControlsComponent, AddNewExternalNotificationComponent, DeleteExternalNotificationComponent
  ],
  imports: [
    CommonModule, RouterModule.forRoot(routes), NgxSpinnerModule, NgbModule, SharedModule, HighchartsChartModule,
    SharedItemModule, ReactiveFormsModule, DataTableModule,
  ],
  exports: [ScenarioComponent, AddNewItemComponent, ScenarioTrendsComponent,
    SettingsScenarioComponent, DeleteScenarioComponent, ExternalNotificationComponent,
    ItemControlsComponent]
})
export class ScenarioModule { }

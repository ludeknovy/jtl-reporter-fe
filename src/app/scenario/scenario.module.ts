import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScenarioComponent } from "./scenario.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { ScenarioTrendsComponent } from "./scenario-trends/scenario-trends.component";
import { SettingsScenarioComponent } from "./scenario-settings/scenario-settings.component";
import { DeleteScenarioComponent } from "./delete-scenario/delete-scenario.component";
import { ExternalNotificationComponent } from "./external-notification/external-notification.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbDropdown, NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { HighchartsChartModule } from "highcharts-angular";
import { ItemControlsComponent } from "./item-controls/item-controls.component";
import { SharedItemModule } from "../shared/shared-item/shared-item.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import {
  AddNewExternalNotificationComponent
} from "./external-notification/add-new-external-notification/add-new-external-notification.component";
import {
  DeleteExternalNotificationComponent
} from "./external-notification/delete-external-notification/delete-external-notification.component";
import { RoleModule } from "../_directives/role.module";
import { AddNewItemModule } from "./add-new-item/add-new-item.module";
import { ScenarioTrendsSettingsComponent } from "./scenario-trends/scenario-trends-settings/scenario-trends-settings.component";
import { EnvironmentsComponent } from "./environments/environments.component";
import { NewShareTokenComponent } from "./share-token/new-share-token/new-share-token.component";
import { DeleteShareTokenComponent } from "./share-token/delete-share-token/delete-share-token.component";
import { ShareTokenComponent } from "./share-token/share-token.component";

const routes: Routes = [
  {
    path: "project/:projectName/scenario/:scenarioName/items", component: ScenarioComponent,
    runGuardsAndResolvers: "always", canActivate: [AuthGuard]
  },

];

@NgModule({
  declarations: [ScenarioComponent, ScenarioTrendsComponent,
    SettingsScenarioComponent, DeleteScenarioComponent, ExternalNotificationComponent,
    ItemControlsComponent, AddNewExternalNotificationComponent, DeleteExternalNotificationComponent, ScenarioTrendsSettingsComponent, EnvironmentsComponent, NewShareTokenComponent, DeleteShareTokenComponent, ShareTokenComponent, ShareTokenComponent
  ],
  imports: [
    CommonModule, RouterModule.forRoot(routes), NgxSpinnerModule, NgbModule, SharedModule, HighchartsChartModule,
    SharedItemModule, ReactiveFormsModule, DataTableModule, RoleModule, AddNewItemModule, FormsModule,

  ],
  exports: [ScenarioComponent, ScenarioTrendsComponent,
    SettingsScenarioComponent, DeleteScenarioComponent, ExternalNotificationComponent,
    ItemControlsComponent]
})
export class ScenarioModule {
}

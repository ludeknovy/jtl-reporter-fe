import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectComponent } from "./project.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { ScenariosGraphComponent } from "./graph/scenarios-graph.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { TimeagoModule } from "ngx-timeago";
import { SharedProjectModule } from "../shared/shared-project/shared-project.module";
import { RoleModule } from "../_directives/role.module";
import { AddNewScenarioModule } from "./new-scenario/add-new-scenario.module";
import { UrlEncodePipeModule } from "../_pipes/url-encode.module";

const routes: Routes = [  {
  path: "project/:projectName/scenarios", component: ProjectComponent,
  runGuardsAndResolvers: "always", canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [ProjectComponent,
    ScenariosGraphComponent
  ],
  imports: [
    CommonModule, RouterModule.forRoot(routes), FormsModule, NgbModule, SharedModule, DataTableModule, ReactiveFormsModule, TimeagoModule, AddNewScenarioModule,
    SharedProjectModule, RoleModule, UrlEncodePipeModule
  ],
  exports: [ProjectComponent, ScenariosGraphComponent]
})
export class ProjectModule { }

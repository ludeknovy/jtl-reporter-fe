import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddNewProjectComponent } from "./add-project/add-project-modal.component";
import { DeleteProjectComponent } from "./delete-project/delete-project.component";
import { NavigationModule } from "../navigation/navigation.module";
import { ProjectsAdministrationComponent } from "./administration.component";
import { AuthGuard } from "../../auth.guard";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedProjectModule } from "../../shared/shared-project/shared-project.module";
import { TimeagoModule } from "ngx-timeago";
import { UrlEncodePipeModule } from "src/app/_pipes/url-encode.module";


const routes: Routes = [
  { path: "administration/projects", component: ProjectsAdministrationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [ProjectsAdministrationComponent, AddNewProjectComponent, DeleteProjectComponent],
    imports: [
        CommonModule, RouterModule.forRoot(routes), NavigationModule, SharedModule, NgbModule, ReactiveFormsModule,
        SharedProjectModule, TimeagoModule, UrlEncodePipeModule, FormsModule
    ],
  exports: [ProjectsAdministrationComponent, AddNewProjectComponent, DeleteProjectComponent]
})
export class ProjectAdministrationModule { }

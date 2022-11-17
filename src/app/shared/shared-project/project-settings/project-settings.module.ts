import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleModule } from "src/app/_directives/role.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ProjectSettingsComponent } from "./project-settings.component";
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProjectSettingsComponent],
  imports: [
    CommonModule, RoleModule, ReactiveFormsModule, NgbNavModule,
  ],
  exports: [ProjectSettingsComponent]
})
export class ProjectSettingsModule { }

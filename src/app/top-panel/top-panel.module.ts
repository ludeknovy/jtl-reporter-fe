import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleModule } from "src/app/_directives/role.module";
import { TopPanelComponent } from "./top-panel.component";
import { RouterModule } from "@angular/router";
import { ProjectAdministrationModule } from "../administration/projects/project-administration.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UrlEncodePipeModule } from "../_pipes/url-encode.module";
import { UrlDecodePipeModule } from "../_pipes/url-decode.module";

@NgModule({
  declarations: [TopPanelComponent],
  imports: [
    CommonModule, RoleModule, RouterModule, ProjectAdministrationModule, NgbModule, UrlEncodePipeModule, UrlDecodePipeModule
  ],
  exports: [TopPanelComponent]
})
export class TopPanelModule { }

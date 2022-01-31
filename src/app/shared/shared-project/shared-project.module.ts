import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectSettingsComponent } from "./project-settings/project-settings.component";
import { ProjectSettingsModule } from "./project-settings/project-settings.module";

@NgModule({
  imports: [
    CommonModule, ProjectSettingsModule
  ],
  exports: [ProjectSettingsComponent]
})
export class SharedProjectModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MyProfileComponent } from "./my-profile.component";
import { ProjectAdministrationModule } from "../projects/project-administration.module";


@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule, SharedModule, ReactiveFormsModule, ProjectAdministrationModule
  ],
  exports: [MyProfileComponent]
})
export class MyProfileModule {
}

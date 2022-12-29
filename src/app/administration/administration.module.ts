import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ApiKeysModule } from "./api-token/api-keys.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ProjectAdministrationModule } from "./projects/project-administration.module";
import { UsersModule } from "./users/users.module";
import { NavigationModule } from "./navigation/navigation.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, SharedModule, ApiKeysModule,
    ReactiveFormsModule, ProjectAdministrationModule, UsersModule, NavigationModule
  ],
  exports: []
})
export class AdministrationModule {
}

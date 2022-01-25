import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ApiKeysModule } from "./api-token/api-keys.module";
import { AuthGuard } from "../auth.guard";
import { ReactiveFormsModule } from "@angular/forms";
import { NavigationModule } from "./navigation/navigation.module";
import { ProjectAdministrationModule } from "./projects/project-administration.module";
import { UsersModule } from "./users/users.module";


const routes: Routes = [
  { path: "administration/my-profile", component: MyProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), SharedModule, ApiKeysModule,
    ReactiveFormsModule, NavigationModule, ProjectAdministrationModule, UsersModule
  ],
  exports: [MyProfileComponent]
})
export class AdministrationModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "./navigation.component";
import { RouterModule, Routes } from "@angular/router";
import { RoleModule } from "src/app/_directives/role.module";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGuard } from "../../auth.guard";
import { ProjectAdministrationModule } from "../projects/project-administration.module";
import { ApiKeysModule } from "../api-token/api-keys.module";
import { UsersModule } from "../users/users.module";
import { MyProfileModule } from "../my-profile/my-profile.module";

const routes: Routes = [
  { path: "administration", component: NavigationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule, RouterModule, RoleModule, NgbNavModule, RouterModule.forRoot(routes), ProjectAdministrationModule, ApiKeysModule,
    UsersModule, MyProfileModule,
  ],
  exports: [NavigationComponent]
})
export class NavigationModule {
}

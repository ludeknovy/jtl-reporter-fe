import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { GlobalSettingsComponent } from "./global-settings.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../auth.guard";
import {AddUserModule} from '../users/add-user/add-user.module';
import {DeleteUserModule} from '../users/delete-user/delete-user.module';
import {RoleModule} from '../../_directives/role.module';


const routes: Routes = [
  { path: "administration/global-settings", component: GlobalSettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [GlobalSettingsComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), SharedModule, ReactiveFormsModule, AddUserModule, DeleteUserModule, RoleModule
  ],
  exports: [GlobalSettingsComponent]
})
export class GlobalSettingsModule {
}

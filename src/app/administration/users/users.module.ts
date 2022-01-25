import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { DeleteUserComponent } from "./delete-user/delete-user.component";
import { NavigationModule } from "../navigation/navigation.module";
import { SharedModule } from "../../shared/shared.module";
import { UsersComponent } from "./users.component";
import { AuthGuard } from "../../auth.guard";


const routes: Routes = [
  { path: "administration/users", component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [UsersComponent, AddUserComponent, DeleteUserComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), SharedModule, NavigationModule,
  ],
  exports: [UsersComponent, AddUserComponent, DeleteUserComponent]
})
export class UsersModule { }

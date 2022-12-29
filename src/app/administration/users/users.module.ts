import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { DeleteUserComponent } from "./delete-user/delete-user.component";
import { SharedModule } from "../../shared/shared.module";
import { UsersComponent } from "./users.component";
import { AuthGuard } from "../../auth.guard";
import { AddUserModule } from "./add-user/add-user.module";
import { DeleteUserModule } from "./delete-user/delete-user.module";


const routes: Routes = [
  { path: "administration/users", component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), SharedModule, AddUserModule, DeleteUserModule,
  ],
  exports: [UsersComponent, AddUserComponent, DeleteUserComponent]
})
export class UsersModule { }

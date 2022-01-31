import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleModule } from "src/app/_directives/role.module";
import { AddUserComponent } from "./add-user.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule, RoleModule, ReactiveFormsModule,
  ],
  exports: [AddUserComponent]
})
export class AddUserModule { }

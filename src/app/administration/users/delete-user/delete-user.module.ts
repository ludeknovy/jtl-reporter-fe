import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleModule } from "src/app/_directives/role.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteUserComponent } from "./delete-user.component";

@NgModule({
  declarations: [DeleteUserComponent],
  imports: [
    CommonModule, RoleModule, ReactiveFormsModule,
  ],
  exports: [DeleteUserComponent]
})
export class DeleteUserModule { }

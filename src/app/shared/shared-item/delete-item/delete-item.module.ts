import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleModule } from "src/app/_directives/role.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteItemComponent } from "./delete-item.component";

@NgModule({
  declarations: [DeleteItemComponent],
  imports: [
    CommonModule, RoleModule, ReactiveFormsModule,
  ],
  exports: [DeleteItemComponent]
})
export class DeleteItemModule { }

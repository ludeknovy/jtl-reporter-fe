import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleModule } from "src/app/_directives/role.module";
import { EditItemComponent } from "./edit-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [EditItemComponent],
  imports: [
    CommonModule, RoleModule, ReactiveFormsModule, NgbModule
  ],
  exports: [EditItemComponent]
})
export class EditItemModule { }

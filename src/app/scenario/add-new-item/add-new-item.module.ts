import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RoleModule } from "src/app/_directives/role.module";
import { AddNewItemComponent } from "./add-new-item.component";

@NgModule({
  declarations: [AddNewItemComponent],
  imports: [
    CommonModule, RouterModule, RoleModule,
  ],
  exports: [AddNewItemComponent]
})
export class AddNewItemModule { }

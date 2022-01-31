import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { EditItemModule } from "./edit-item/edit-item.module";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { DeleteItemModule } from "./delete-item/delete-item.module";

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, EditItemModule, DeleteItemModule,
  ],
  exports: [DeleteItemComponent, EditItemComponent]
})
export class SharedItemModule { }

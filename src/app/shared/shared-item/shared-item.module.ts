import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DeleteItemComponent, EditItemComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [DeleteItemComponent, EditItemComponent]
})
export class SharedItemModule { }

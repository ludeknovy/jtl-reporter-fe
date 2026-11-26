import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BatchDeleteItemComponent } from "./batch-delete-item.component";

@NgModule({
  declarations: [BatchDeleteItemComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [BatchDeleteItemComponent],
})
export class BatchDeleteItemModule {}

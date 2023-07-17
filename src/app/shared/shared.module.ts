import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { RouterModule } from "@angular/router";
import { UrlDecodePipeModule } from "../_pipes/url-decode.module";
import { DateTimePickerComponent } from "./date-time-picker/date-time-picker.component";
import { NgbDatepickerModule, NgbPopoverModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ControlPanelComponent, BreadcrumbComponent, DateTimePickerComponent],
  imports: [
    CommonModule, RouterModule, UrlDecodePipeModule, NgbPopoverModule, FormsModule, NgbTimepickerModule, NgbDatepickerModule
  ],
    exports: [ControlPanelComponent, BreadcrumbComponent, DateTimePickerComponent]
})
export class SharedModule { }

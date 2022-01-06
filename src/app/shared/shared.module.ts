import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ControlPanelComponent, BreadcrumbComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [ControlPanelComponent, BreadcrumbComponent ]
})
export class SharedModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "./navigation.component";
import { RouterModule } from "@angular/router";
import { RoleModule } from "src/app/_directives/role.module";

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule, RouterModule, RoleModule,
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }

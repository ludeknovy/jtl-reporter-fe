import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoleModule } from "src/app/_directives/role.module";
import { AddNewScenarioComponent } from "./add-new.scenario.component";

@NgModule({
    declarations: [AddNewScenarioComponent
    ],
    imports: [
      CommonModule, RoleModule, ReactiveFormsModule, FormsModule,
    ],
    exports: [AddNewScenarioComponent]
  })
  export class AddNewScenarioModule { }
  
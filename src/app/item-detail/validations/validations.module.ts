import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinTestDurationWarningComponent } from "./min-test-duration-warning/min-test-duration-warning.component";
import { ZeroErrorToleranceWarningComponent } from "./zero-error-tolerance-warning/zero-error-tolerance-warning.component";


@NgModule({
  declarations: [MinTestDurationWarningComponent, ZeroErrorToleranceWarningComponent],
  exports: [
    ZeroErrorToleranceWarningComponent,
    MinTestDurationWarningComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ValidationsModule {
}

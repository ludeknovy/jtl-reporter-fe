import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { InitUserComponent } from "./init-user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "init", component: InitUserComponent }];

@NgModule({
  declarations: [InitUserComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), ReactiveFormsModule
  ],
  exports: [InitUserComponent]
})
export class InitUserModule {
}

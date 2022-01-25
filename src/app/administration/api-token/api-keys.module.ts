import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddTokenComponent } from "./add-token/add-token.component";
import { DeleteTokenComponent } from "./delete-token/delete-token.component";
import { SharedModule } from "../../shared/shared.module";
import { AuthGuard } from "../../auth.guard";
import { ApiKeysComponent } from "./api-keys.component";
import { NavigationModule } from "../navigation/navigation.module";
import { FormControl, ReactiveFormsModule } from "@angular/forms";


const routes: Routes = [
  { path: "administration/api-keys", component: ApiKeysComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [ApiKeysComponent, AddTokenComponent, DeleteTokenComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), SharedModule, NavigationModule, ReactiveFormsModule
  ],
  exports: [ApiKeysComponent, AddTokenComponent, DeleteTokenComponent]
})
export class ApiKeysModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ForbiddenComponent } from "./forbidden/forbidden.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent }
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule, ReactiveFormsModule, NgbTooltipModule],
  declarations: [
    LoginComponent, DashboardComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

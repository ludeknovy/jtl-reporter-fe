import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth.guard';
import {ProjectsAdministrationComponent} from './administration/projects/administration.component';
import {ApiKeysComponent} from './administration/api-token/api-keys.component';
import {MyProfileComponent} from './administration/my-profile/my-profile.component';
import {UsersComponent} from './administration/users/users.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {LoginComponent} from './login/login.component';
import {InitUserComponent} from './init-user/init-user.component'; // CLI imports router

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'administration/projects', component: ProjectsAdministrationComponent, canActivate: [AuthGuard] },
  { path: 'administration/api-keys', component: ApiKeysComponent, canActivate: [AuthGuard] },
  { path: 'administration/my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'administration/users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/item/:id', component: ItemDetailComponent,
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'init', component: InitUserComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [ItemDetailComponent,
    LoginComponent, InitUserComponent, UsersComponent, MyProfileComponent, ApiKeysComponent,
    ProjectsAdministrationComponent, DashboardComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

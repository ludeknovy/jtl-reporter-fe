import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {TopPanelComponent} from './top-panel/top-panel.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [{
  path: 'project/:projectName/scenario/:scenarioName/items', component: TopPanelComponent,
  runGuardsAndResolvers: 'always', canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [ControlPanelComponent, BreadcrumbComponent, TopPanelComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ControlPanelComponent, BreadcrumbComponent, TopPanelComponent, RouterModule ]
})
export class SharedModule { }

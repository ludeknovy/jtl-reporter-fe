import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectComponent} from './project.component';
import {ProjectSettingsComponent} from './project-settings/project-settings.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {AddNewScenarioComponent} from './new-scenario/add-new.scenario.component';
import {ScenariosGraphComponent} from './graph/scenarios-graph.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [  {
  path: 'project/:projectName/scenarios', component: ProjectComponent,
  runGuardsAndResolvers: 'always', canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [ProjectComponent, ProjectSettingsComponent,
    AddNewScenarioComponent, ScenariosGraphComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), FormsModule, NgbModule, SharedModule
  ],
  exports: [RouterModule]
})
export class ProjectModule { }

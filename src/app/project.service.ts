import { Injectable } from '@angular/core';
import { ProjectApiService } from './project-api.service';
import { BehaviorSubject } from 'rxjs';
import { ProjectsListing } from './project-api.service.model';
import { IScenarios, Items } from './items.service.model';
import { scenarioHistoryGraphs } from './graphs/scenario-trends';
import { ScenarioApiService } from './scenario-api.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private state = new BehaviorSubject<ProjectsListing[]>([]);
  public state$ = this.state.asObservable();

  private items = new BehaviorSubject<Items>({ name, data: [], total: 0 });
  public items$ = this.items.asObservable();

  private scenarios = new BehaviorSubject<IScenarios[]>([]);
  public scenarios$ = this.scenarios.asObservable();

  private trends = new BehaviorSubject<{}>({});
  public trends$ = this.trends.asObservable();

  constructor(
    private projectApiService: ProjectApiService,
    private scenarioApiService: ScenarioApiService
  ) { }

  loadProjects() {
    this.projectApiService.fetchProjects()
      .subscribe(_ => {
        _.sort((a, b) => {
          const nameA = a.projectName.toUpperCase();
          const nameB = b.projectName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        return this.state.next(_);
      });
  }

  fetchScenarios(projectName) {
    this.scenarioApiService.fetchScenarios(projectName)
      .subscribe(_ => this.scenarios.next(_));
  }

  fetchScenarioTrends(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioTrend(projectName, scenarioName)
      .subscribe(_ => this.trends.next(scenarioHistoryGraphs(_, projectName, scenarioName)));
  }

}

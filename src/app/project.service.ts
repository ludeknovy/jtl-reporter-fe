import { Injectable } from "@angular/core";
import { ProjectApiService } from "./project-api.service";
import { BehaviorSubject, interval } from "rxjs";
import { ProjectsListing } from "./project-api.service.model";
import { IScenarios, Items } from "./items.service.model";
import { ScenarioApiService } from "./scenario-api.service";

@Injectable({
  providedIn: "root"
})

export class ProjectService {
  public processingItemsInterval;

  private state = new BehaviorSubject<ProjectsListing[]>([]);
  public state$ = this.state.asObservable();

  private items = new BehaviorSubject<Items>({ name: undefined, data: [], total: 0 });
  public items$ = this.items.asObservable();

  private scenarios = new BehaviorSubject<IScenarios[]>([]);
  public scenarios$ = this.scenarios.asObservable();

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

}

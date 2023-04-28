import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ScenarioNotifications } from "./items.service.model";
import { ScenarioApiService } from "./scenario-api.service";

@Injectable({
  providedIn: "root"
})

export class ScenarioService {

  private trends = new BehaviorSubject<Record<string, any>>({});
  public trends$ = this.trends.asObservable();

  private environments = new BehaviorSubject<Array<string>>([]);
  public environments$ = this.environments.asObservable();

  private notifications = new BehaviorSubject<ScenarioNotifications[]>([]);
  public notifications$ = this.notifications.asObservable();

  private environment = ""

  constructor(
    private scenarioApiService: ScenarioApiService
  ) { }


  fetchScenarioTrends(projectName, scenarioName) {
    const queryParams = { environment: this.environment };
    console.log("fetchScenarioTrends", queryParams);
    this.scenarioApiService.fetchScenarioTrend(projectName, scenarioName, queryParams)
      .subscribe(_ => this.trends.next(_));
  }

  fetchScenarioNotifications(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioNotification(projectName, scenarioName)
      .subscribe(_ => this.notifications.next(_));
  }

  fetchEnvironments(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioEnvironments(projectName, scenarioName)
      .subscribe(_ => this.environments.next(_));
  }

  setEnvironment(environment: string) {
    this.environment = environment
  }

  updateScenarioTrends(value) {
    this.trends.next(value)
  }

}

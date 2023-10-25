import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ScenarioNotifications } from "./items.service.model";
import { ScenarioApiService } from "./scenario-api.service";
import { EnvironmentService } from "./_services/environment.service";

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
  private environment: string;

  constructor(
    private scenarioApiService: ScenarioApiService,
    private environmentService: EnvironmentService
  ) {
    this.environmentService.environment$.subscribe(value => {
      this.environment = value;
    })
  }


  fetchScenarioTrends(projectName, scenarioName, params = {}) {
    const queryParams = { environment: this.environment, ...params };
    this.scenarioApiService.fetchScenarioTrend(projectName, scenarioName, queryParams)
      .subscribe(_ => this.trends.next(_));
  }

  fetchScenarioNotifications(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioNotification(projectName, scenarioName)
      .subscribe(_ => this.notifications.next(_));
  }

  fetchEnvironments(projectName, scenarioName, queryParams = {}) {
    this.scenarioApiService.fetchScenarioEnvironments(projectName, scenarioName, queryParams)
      .subscribe(_ => this.environments.next(_));
  }

  updateScenarioTrends(value) {
    this.trends.next(value);
  }

}

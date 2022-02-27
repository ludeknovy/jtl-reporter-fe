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

  private notifications = new BehaviorSubject<ScenarioNotifications[]>([]);
  public notifications$ = this.notifications.asObservable();

  constructor(
    private scenarioApiService: ScenarioApiService
  ) { }


  fetchScenarioTrends(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioTrend(projectName, scenarioName)
      .subscribe(_ => this.trends.next(_));
  }

  fetchScenarioNotifications(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioNotification(projectName, scenarioName)
      .subscribe(_ => this.notifications.next(_));
  }

}

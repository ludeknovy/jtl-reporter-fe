import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ScenarioNotifications } from "./items.service.model";
import { ScenarioApiService } from "./scenario-api.service";
import {ExecutionFile} from './scenario.service.model';

@Injectable({
  providedIn: "root"
})

export class ScenarioService {

  private trends = new BehaviorSubject<Record<string, any>>({});
  public trends$ = this.trends.asObservable();

  private notifications = new BehaviorSubject<ScenarioNotifications[]>([]);
  public notifications$ = this.notifications.asObservable();

  private executionFiles = new BehaviorSubject<ExecutionFile[]>([]);
  public executionFiles$ = this.executionFiles.asObservable();

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

  fetchScenarioExecutionFiles(projectName, scenarioName) {
    this.scenarioApiService.fetchExecutionFiles(projectName, scenarioName)
      .subscribe(_ => this.executionFiles.next(_));
  }

}



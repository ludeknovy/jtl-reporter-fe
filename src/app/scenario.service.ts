import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { scenarioHistoryGraphs } from './graphs/scenario-trends';
import { ScenarioNotifications } from './items.service.model';
import { ScenarioApiService } from './scenario-api.service';

@Injectable({
  providedIn: 'root'
})

export class ScenarioService {

  private trends = new BehaviorSubject<{}>({});
  public trends$ = this.trends.asObservable();

  private notifications = new BehaviorSubject<ScenarioNotifications[]>([]);
  public notifications$ = this.notifications.asObservable()

  constructor(
    private scenarioApiService: ScenarioApiService
  ) { }


  fetchScenarioTrends(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioTrend(projectName, scenarioName)
      .subscribe(_ => this.trends.next(scenarioHistoryGraphs(_, projectName, scenarioName)));
  }

  fetchScenarioNotifications(projectName, scenarioName) {
    this.scenarioApiService.fetchScenarioNotification(projectName, scenarioName)
      .subscribe(_ => this.notifications.next(_))
  }

}

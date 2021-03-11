import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {IScenarios, ScenarioNotifications} from './items.service.model';
import { Scenario } from './scenario.service.model';

@Injectable({
  providedIn: 'root'
})
export class ScenarioApiService {

  private response = new BehaviorSubject<any>({});
  public response$ = this.response.asObservable();

  constructor(private http: HttpClient) {}

  getScenario(projectName, scenarioName): Observable<Scenario> {
    return this.http.get<Scenario>(`projects/${projectName}/scenarios/${scenarioName}`);
  }
  updateScenario(projectName, scenarioName, body): Observable<{}> {
    return this.http.put(`projects/${projectName}/scenarios/${scenarioName}`, body, { observe: 'response'});
  }

  deleteScenario(projectName, scenarioName): Observable<{}> {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}`, { observe: 'response' });
  }

  fetchScenarios(projectName): Observable<IScenarios[]> {
    return this.http.get<IScenarios[]>(`projects/${projectName}/scenarios`);
  }

  fetchScenarioTrend(projectName, scenarioName): Observable<any[]> {
    return this.http.get<any[]>(
      `projects/${projectName}/scenarios/${scenarioName}/trends`);
  }

  createNewScenario(projectName, body): Observable<{}> {
    return this.http.post(`projects/${projectName}/scenarios`, body, { observe: 'response'});
  }

  fetchScenarioNotification(projectName, scenarioName): Observable<ScenarioNotifications[]> {
    return this.http.get<ScenarioNotifications[]>(`projects/${projectName}/scenarios/${scenarioName}/notifications`);
  }

  deleteScenarioNotification(projectName, scenarioName, id): Observable<{}> {
    return this.http.delete<{}>(`projects/${projectName}/scenarios/${scenarioName}/notifications/${id}`, { observe: 'response'});
  }

  createNewScenarioNotification(projectName, scenarioName, body): Observable<{}> {
    return this.http.post(`projects/${projectName}/scenarios/${scenarioName}/notifications`, body, { observe: 'response' });
  }

  fetchThresholds(projectName, scenarioName) {
    return this.http.get(`projects/${projectName}/scenarios/${scenarioName}/thresholds`);
  }

  updateThresholds(projectName, scenarioName, body) {
    return this.http.put(`projects/${projectName}/scenarios/${scenarioName}/thresholds`, body, { observe: 'response'});
  }

  setData(data) {
    this.response.next(data);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { IScenarios, ScenarioNotifications } from "./items.service.model";
import { Scenario } from "./scenario.service.model";
import { ScenarioShareToken } from "./scenario-api.service.model";

@Injectable({
  providedIn: "root"
})
export class ScenarioApiService {

  private response = new BehaviorSubject<any>({});
  public response$ = this.response.asObservable();

  constructor(private http: HttpClient) {
  }

  getScenario(projectName, scenarioName): Observable<Scenario> {
    return this.http.get<Scenario>(`projects/${projectName}/scenarios/${scenarioName}`);
  }

  getScenarioUserSettings(projectName, scenarioName): Observable<Scenario> {
    return this.http.get<Scenario>(`projects/${projectName}/scenarios/${scenarioName}/user-settings`);
  }

  updateScenario(projectName, scenarioName, body): Observable<Record<string, any>> {
    return this.http.put(`projects/${projectName}/scenarios/${scenarioName}`, body, { observe: "response" });
  }

  updateScenarioUserSettings(projectName, scenarioName, body): Observable<Record<string, any>> {
    return this.http.put(`projects/${projectName}/scenarios/${scenarioName}/user-settings`, body, { observe: "response" });
  }

  deleteScenario(projectName, scenarioName): Observable<Record<string, any>> {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}`, { observe: "response" });
  }

  fetchScenarios(projectName): Observable<IScenarios[]> {
    return this.http.get<IScenarios[]>(`projects/${projectName}/scenarios`);
  }

  fetchScenarioTrend(projectName, scenarioName, params?): Observable<any[]> {
    return this.http.get<any[]>(
      `projects/${projectName}/scenarios/${scenarioName}/trends`, { params });
  }

  fetchScenarioEnvironments(projectName, scenarioName, params): Observable<any> {
    return this.http.get<any>(
      `projects/${projectName}/scenarios/${scenarioName}/environment`, { params });
  }

  createNewScenario(projectName, body): Observable<Record<string, any>> {
    return this.http.post(`projects/${projectName}/scenarios`, body, { observe: "response" });
  }

  fetchScenarioNotification(projectName, scenarioName): Observable<ScenarioNotifications[]> {
    return this.http.get<ScenarioNotifications[]>(`projects/${projectName}/scenarios/${scenarioName}/notifications`);
  }

  deleteScenarioNotification(projectName, scenarioName, id): Observable<Record<string, any>> {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}/notifications/${id}`, { observe: "response" });
  }

  createNewScenarioNotification(projectName, scenarioName, body): Observable<Record<string, any>> {
    return this.http.post(`projects/${projectName}/scenarios/${scenarioName}/notifications`, body, { observe: "response" });
  }

  updateScenarioTrendsSettings(projectName, scenarioName, body): Observable<unknown> {
    return this.http.post(`projects/${projectName}/scenarios/${scenarioName}/trends/settings`, body, { observe: "response" });
  }

  fetchScenarioShareTokens(projectName, scenarioName): Observable<ScenarioShareToken[]> {
    return this.http.get<ScenarioShareToken[]>(`projects/${projectName}/scenarios/${scenarioName}/share-token`);
  }

  createScenarioShareToken(projectName, scenarioName, body) {
    return this.http.post(`projects/${projectName}/scenarios/${scenarioName}/share-token`, body, { observe: "response" });
  }

  deleteScenarioShareToken(projectName, scenarioName, token) {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}/share-token/${token}`, { observe: "response" })
  }

  setData(data) {
    this.response.next(data);
  }
}

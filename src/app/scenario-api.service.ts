import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IScenarios } from './items.service.model';

@Injectable({
  providedIn: 'root'
})
export class ScenarioApiService {

  private response = new BehaviorSubject<any>({});
  public response$ = this.response.asObservable();

  constructor(private http: HttpClient) {
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

  setData(data) {
    this.response.next(data);
  }
}

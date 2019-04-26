import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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

  setData(data) {
    this.response.next(data);
  }
}

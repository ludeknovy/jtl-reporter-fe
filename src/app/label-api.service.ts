import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LabelTrend, LabelMaxVu } from './items.service.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LabelApiService {

  private labelTrend = new BehaviorSubject<LabelTrend>({
    timePoints: [],
    n0: [],
    n5: [],
    n9: [],
    threads: [],
    throughput: [],
    errorRate: [],
    id: '',
  });
  public labelTrend$ = this.labelTrend.asObservable();

  constructor(private http: HttpClient) { }

  fetchLabelTrend(projectName, scenarioName, itemId, label, params) {
    return this.http.get<LabelTrend>(
      `projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/label/${label}/trend`, { params })
      .subscribe((_) => this.labelTrend.next(_));
  }

  fetchLabelMaxVu(projectName, scenarioName, itemId, label, params) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<LabelMaxVu>(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/label/${label}/virtual-users`, { params });
  }
}

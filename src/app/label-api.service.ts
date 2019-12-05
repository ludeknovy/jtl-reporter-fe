import { Injectable } from '@angular/core';
import { LabelTrend, LabelMaxVu } from './items.service.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LabelApiService {

  constructor(private http: HttpClient) { }

  fetchLabelTrend(projectName, scenarioName, itemId, label, params) {
    return this.http.get<LabelTrend>(
      `projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/label/${label}/trend`, { params });
  }

  fetchLabelMaxVu(projectName, scenarioName, itemId, label, params) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<LabelMaxVu>(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/label/${label}/virtual-users`, { params });
  }
}

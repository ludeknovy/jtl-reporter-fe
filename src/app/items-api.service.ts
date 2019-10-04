import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ItemDetail, Items } from './items.service.model';

@Injectable({
  providedIn: 'root'
})

export class ItemsApiService {
  private response = new BehaviorSubject<any>({});
  public response$ = this.response.asObservable();


  constructor(private http: HttpClient) {
  }

  fetchItemDetail(projectName: string, scenarioName: string, itemId: string): Observable<ItemDetail> {
    return this.http.get<ItemDetail>(
      `projects/${projectName}/scenarios/${scenarioName}/items/${itemId}`);
  }

  updateItemInfo(itemId, projectName, scenarioName, body): Observable<{}> {
    return this.http.put(
      `projects/${projectName}/scenarios/${scenarioName}/items/${itemId}`,
      body,
      { observe: 'response' }
    );
  }

  addNewTestItem(projectName: string, scenarioName: string,
    environment: string = null, note, status, kpiFile, errorFile?) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('kpi', kpiFile);
    formData.append('environment', environment);
    formData.append('note', note);
    formData.append('status', status);
    if (errorFile) {
      formData.append('errors', errorFile);
    }
    return this.http.post(
      `projects/${projectName}/scenarios/${scenarioName}/items`,
      formData, {
      headers, observe: 'response'
    }
    );
  }

  deleteItem(itemId, scenarioName, projectName) {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}`, { observe: 'response' });
  }

  fetchItems(projectName: string, scenarioName, params): Observable<Items> {
    return this.http.get<Items>(
      `projects/${projectName}/scenarios/${scenarioName}/items`, { params });
  }

  downloadTestErrors(params) {
    const { projectName, scenarioName, id } = params;
    return this.http.get(
      `projects/${projectName}/scenarios/${scenarioName}/items/${id}/errors`, {
      responseType: 'blob',
    }
    );
  }

  setData(data) {
    this.response.next(data);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { ItemDetail, Items, UpsertItemChartSettings } from "./items.service.model";

@Injectable({
  providedIn: "root"
})

export class ItemsApiService {
  private response = new BehaviorSubject<any>({});
  public response$ = this.response.asObservable();


  constructor(private http: HttpClient) {
  }

  fetchItemDetail(projectName: string, scenarioName: string, itemId: string, params?): Observable<ItemDetail> {
    return this.http.get<ItemDetail>(
      `projects/${projectName}/scenarios/${scenarioName}/items/${itemId}`,
      { params });
  }

  updateItemInfo(itemId, projectName, scenarioName, body): Observable<Record<string, any>> {
    return this.http.put(
      `projects/${projectName}/scenarios/${scenarioName}/items/${itemId}`,
      body,
      { observe: "response" }
    );
  }

  addNewTestItem(projectName: string, scenarioName: string,
    environment: string = null, note, hostname, status, kpiFile, errorFile?, monitoringFile?) {
    const headers = new HttpHeaders();
    headers.set("Content-Type", null);
    headers.set("Accept", "multipart/form-data");
    const formData: FormData = new FormData();
    formData.append("kpi", kpiFile);
    formData.append("environment", environment);
    formData.append("note", note);
    formData.append("hostname", hostname);
    formData.append("status", status);
    if (errorFile) {
      formData.append("errors", errorFile);
    }
    if (monitoringFile) {
      formData.append("monitoring", monitoringFile);
    }
    return this.http.post(
      `projects/${projectName}/scenarios/${scenarioName}/items`,
      formData, {
      headers, observe: "response"
    }
    );
  }

  deleteItem(itemId, scenarioName, projectName) {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}`, { observe: "response" });
  }

  fetchItems(projectName: string, scenarioName, params): Observable<Items> {
    return this.http.get<Items>(
      `projects/${projectName}/scenarios/${scenarioName}/items`, { params });
  }

  setData(data) {
    this.response.next(data);
  }

  fetchProcessingItems(projectName, scenarioName): Observable<[]> {
    return this.http.get<[]>(`projects/${projectName}/scenarios/${scenarioName}/processing-items`);
  }

  fetchItemShareTokens(projectName, scenarioName, itemId): Observable<[]> {
    return this.http.get<[]>(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/share-tokens`);
  }

  createItemShareToken(projectName, scenarioName, itemId, body: { note?: string }): Observable<HttpResponse<{ token: string }>> {
    return this.http.post<{ token: string }>(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/share-tokens`, body, {
      observe: "response"
    });
  }

  deleteItemShareToken(projectName, scenarioName, itemId, id): Observable<HttpResponse<Record<string, any>>> {
    return this.http.delete(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/share-tokens/${id}`,
      { observe: "response" });
  }

  upsertItemChartSettings(projectName, scenarioName, itemId, body: UpsertItemChartSettings) {
    return this.http.post(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/custom-chart-settings`,
      body, { observe: "response" });
  }

  fetchItemChartSettings(projectName, scenarioName, itemId) {
    return this.http.get(`projects/${projectName}/scenarios/${scenarioName}/items/${itemId}/custom-chart-settings`);
  }
}

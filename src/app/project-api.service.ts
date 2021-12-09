import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProjectsListing, NewProjectBody } from './project-api.service.model';
import { ItemsListing, IScenarios, ProjectsOverallStats } from './items.service.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  private response = new BehaviorSubject<any>({});
  public response$ = this.response.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchProjects(): Observable<ProjectsListing[]> {
    return this.http.get<ProjectsListing[]>(
      `projects`);
  }

  createNewProject(body: NewProjectBody): Observable<{}> {
    return this.http.post('projects', body, { observe: 'response' });
  }

  fetchLatestItems(): Observable<ItemsListing[]> {
    return this.http.get<ItemsListing[]>('projects/latest-items');
  }

  getProject(projectName): Observable<any> {
    return this.http.get(`projects/${projectName}`, { observe: 'response' });
  }

  deleteProject(projectName): Observable<any> {
    return this.http.delete(`projects/${projectName}`, { observe: 'response' });
  }

  updateProject(projectName, body):  Observable<HttpResponse<any>> {
    return this.http.put<any>(`projects/${projectName}`, body, { observe: 'response' });
  }

  fetchOverallStats(): Observable<ProjectsOverallStats> {
    return this.http.get<ProjectsOverallStats>('projects/overall-stats');
  }

  setData(data) {
    this.response.next(data);
  }
}

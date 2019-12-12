import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiKey, NewTokenReponse } from './api-token.model';

@Injectable({
  providedIn: 'root'
})
export class ApiTokenService {

  private apiKeys = new BehaviorSubject<ApiKey[]>([]);
  public apiKeys$ = this.apiKeys.asObservable();

  constructor(private http: HttpClient) { }

  fetchApiKeys(): Observable<ApiKey[]> {
    return this.http.get<ApiKey[]>('api-tokens');
  }

  createApiToken(body: { description: string; }): Observable<any> {
    return this.http.post<NewTokenReponse>('api-tokens', body, { observe: 'response' });
  }
  deleteApiToken(body: { id: string }): Observable<any> {
    return this.http.request('delete', 'api-tokens', { observe: 'response', body });
  }

  loadApiKeys() {
    this.fetchApiKeys().subscribe((_) => this.apiKeys.next(_));
  }
}

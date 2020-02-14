import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable, BehaviorSubject } from 'rxjs';
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = new BehaviorSubject<Users[]>([]);
  public users$ = this.users.asObservable();

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('users');
  }

  loadUsers() {
    this.fetchUsers().subscribe(_ => this.users.next(_));
  }

  createNewUser(body) {
    return this.http.post('users', body, { observe: 'response' });
  }

  deleteUser(userId): Observable<any> {
    return this.http.request('delete', `users/${userId}`, { observe: 'response' });
  }
}

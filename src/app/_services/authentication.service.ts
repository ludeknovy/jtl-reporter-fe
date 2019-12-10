import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiKey } from './api-token.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`auth/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    this.setLogin(false);
    localStorage.removeItem('currentUser');
  }

  changePassword(body): Observable<any> {
    return this.http.post<any>('auth/change-password', body, { observe: 'response'})
  }

  setLogin (value) {
    this.loggedIn.next(value);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

}

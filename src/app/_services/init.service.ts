import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InitService {

  constructor(private http: HttpClient) { }

  fetchInfo(): Observable<{ initialized: boolean }> {
    return this.http.get<{ initialized: boolean }>("info");
  }
}

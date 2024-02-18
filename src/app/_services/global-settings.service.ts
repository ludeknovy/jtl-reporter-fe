import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { GlobalSettings } from "./global-settings.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalSettingsService {

  private notification = new BehaviorSubject<any>({});
  public notification$ = this.notification.asObservable();

  constructor(private http: HttpClient) {
  }

  getGlobalSettings(): Observable<GlobalSettings> {
    return this.http.get<GlobalSettings>("global-settings");
  }

  updateGlobalSettings(payload: GlobalSettings) {
    return this.http.put("global-settings", payload, { observe: "response" });
  }

  setNotificationMessage(response) {
    this.notification.next(response);
  }
}

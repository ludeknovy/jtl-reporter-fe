import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  private notificationMessage = new BehaviorSubject<any>({});
  public notificationMessage$ = this.notificationMessage.asObservable();

  public showNotification(message) {
    this.notificationMessage.next(message);
  }
}

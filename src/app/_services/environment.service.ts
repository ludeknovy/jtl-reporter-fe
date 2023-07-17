import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EnvironmentService {

  private environment = new BehaviorSubject<string>("");
  public environment$ = this.environment.asObservable();


  setEnvironment(value: string) {
    this.environment.next(value);
  }
}

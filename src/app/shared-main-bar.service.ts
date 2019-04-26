import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedMainBarService {

  private project = new Subject<string>();
  public project$ = this.project.asObservable();

  constructor() { }

  setProjectName(projectName) {
    this.project.next(projectName);
  }
}

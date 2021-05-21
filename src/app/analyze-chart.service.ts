import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Metrics} from './item-detail/metrics';

@Injectable({
  providedIn: 'root'
})
export class AnalyzeChartService {

  public subject = new Subject<any>();
  private dataSource = new BehaviorSubject<AnalyzeChartData>(null);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeMessage(data: AnalyzeChartData) {
    this.dataSource.next(data);
  }
}

interface AnalyzeChartData {
  metrics?: Metrics[];
  label: string;
}

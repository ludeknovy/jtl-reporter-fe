import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChartLines, getChartLines } from "./chart-service-utils";

@Injectable({
  providedIn: "root"
})
export class ItemChartService {

  private plot$ = new BehaviorSubject<ChartLines>({ chartLines: null });
  private interval;

  selectedPlot$ = this.plot$.asObservable();


  setInterval(interval) {
    this.interval = interval;
  }

  setCurrentPlot(plot) {
    this.plot$.next(getChartLines(plot));
  }
}

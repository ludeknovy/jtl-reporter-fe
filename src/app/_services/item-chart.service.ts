import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChartLines, getChartLines } from "./chart-service-utils";

@Injectable({
  providedIn: "root"
})
export class ItemChartService {

  private plot = new BehaviorSubject<ChartLines>({ chartLines: null });
  private plotRange = new BehaviorSubject<PlotRange>({ start: null, end: null });
  private interval;

  selectedPlot$ = this.plot.asObservable();
  plotRange$ = this.plotRange.asObservable()


  setInterval(interval) {
    this.interval = interval;
  }

  setCurrentPlot(plot) {
    this.plot.next(getChartLines(plot));
  }

  setPlotRange(plotRange: PlotRange) {
    this.plotRange.next(plotRange);
  }

  getPlotRange() {
    return this.plotRange.getValue()
  }
}

interface PlotRange {
  start: Date,
  end: Date
}

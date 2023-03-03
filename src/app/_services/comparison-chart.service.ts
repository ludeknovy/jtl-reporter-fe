import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChartLines, getChartLines } from "./chart-service-utils";

@Injectable({
  providedIn: "root"
})
export class ComparisonChartService {


  private plot$ = new BehaviorSubject<ChartLines>({ chartLines: null });
  private histogramPlot$ = new BehaviorSubject<{ responseTimePerLabelDistribution: []}>(null);

  private interval;
  selectedPlot$ = this.plot$.asObservable();
  histogram$ = this.histogramPlot$.asObservable()


  setInterval(interval) {
    this.interval = interval;
  }

  setHistogramPlot(plot) {
    this.histogramPlot$.next(plot);
  }

  resetPlot() {
    this.plot$.next(null)

  }

  setComparisonPlot(defaultPlot, extraPlots) {
    let comparisonPlot = null
    if (this.interval === undefined || this.interval === "Auto") {
      comparisonPlot = defaultPlot
    } else {
      comparisonPlot = extraPlots?.extraIntervals?.find(interval => interval.interval === this.interval)?.data
    }
    this.plot$.next(getChartLines(comparisonPlot))
  }
}

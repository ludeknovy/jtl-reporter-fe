import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChartLines, getChartLines } from "./chart-service-utils";

@Injectable({
  providedIn: "root"
})
export class ComparisonChartService {


  private plot$ = new BehaviorSubject<ChartLines>({ chartLines: null });
  private histogramPlot$ = new BehaviorSubject<{ responseTimePerLabelDistribution: []}>(null);

  private interval$ = new BehaviorSubject<string>(null);
  selectedPlot$ = this.plot$.asObservable();
  histogram$ = this.histogramPlot$.asObservable()


  setInterval(interval) {
    this.interval$.next(interval);
  }

  setHistogramPlot(plot) {
    this.histogramPlot$.next(plot);
  }

  resetPlot() {
    this.plot$.next(null)

  }

  setComparisonPlot(defaultPlot, extraPlots) {
    this.interval$.subscribe(interval => {
      let comparisonPlot = null
      if (!interval || interval === "Auto") {
        comparisonPlot = defaultPlot
      } else {
        const extraPlotIntervalData = extraPlots?.find(extraPlot => extraPlot.interval === interval)?.data
        comparisonPlot = extraPlotIntervalData || defaultPlot
      }
      this.plot$.next(comparisonPlot ? getChartLines(comparisonPlot): null)
    })

  }
}

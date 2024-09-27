import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChartLine, getChartLines } from "./chart-service-utils";

@Injectable({
  providedIn: 'root'
})
export class ComparisonChartService {


  private plot$ = new BehaviorSubject<ComparisonChartLines>({ chartLines: null, startDate: null, endDate: null });
  private histogramPlot$ = new BehaviorSubject<{ responseTimePerLabelDistribution: [] }>(null);

  private interval$ = new BehaviorSubject<string>(null);
  selectedPlot$ = this.plot$.asObservable();
  histogram$ = this.histogramPlot$.asObservable();


  setInterval(interval) {
    this.interval$.next(interval);
  }

  setHistogramPlot(plot) {
    this.histogramPlot$.next(plot);
  }

  resetPlot() {
    this.plot$.next(null);

  }

  setComparisonPlot(defaultPlot: ChartLine, extraPlots, startDate, endDate) {
    this.interval$.subscribe(interval => {
      let comparisonPlot: ChartLine = null;
      if (!interval || interval === "Auto") {
        comparisonPlot = defaultPlot;
      } else {
        const extraPlotIntervalData = extraPlots?.find(extraPlot => extraPlot.interval === interval)?.data;
        comparisonPlot = extraPlotIntervalData || defaultPlot;
      }
      this.plot$.next({
        chartLines: comparisonPlot ? getChartLines(comparisonPlot).chartLines : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      });
    });

  }
}

export interface ComparisonChartLines {
  chartLines?: ChartLine;
  startDate: Date;
  endDate: Date;
}

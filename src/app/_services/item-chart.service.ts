import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChartLines, getChartLines } from "./chart-service-utils";
import { MonitoringData } from "../items.service.model";

@Injectable({
  providedIn: "root"
})
export class ItemChartService {

  private plot = new BehaviorSubject<ChartLines>({ chartLines: null });
  private plotRange = new BehaviorSubject<PlotRange>({ start: null, end: null });

  selectedPlot$ = this.plot.asObservable();
  plotRange$ = this.plotRange.asObservable();

  setCurrentPlot(plot, monitoringPlot: MonitoringData[]) {
    this.plot.next(getChartLines(plot, monitoringPlot));
  }

  setPlotRange(plotRange: PlotRange) {
    this.plotRange.next(plotRange);
  }

  getPlotRange() {
    return this.plotRange.getValue();
  }
}

interface PlotRange {
  start: Date,
  end: Date
}

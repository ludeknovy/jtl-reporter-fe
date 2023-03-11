import { Component, Input, OnInit } from "@angular/core";
import { ItemDataPlot, ItemExtraPlot } from "src/app/items.service.model";
import { ItemChartService } from "src/app/_services/item-chart.service";
import { interval } from "rxjs";
import { ComparisonChartService } from "../../_services/comparison-chart.service";

@Component({
  selector: "app-chart-interval",
  templateUrl: "./chart-interval.component.html",
  styleUrls: ["./chart-interval.component.css"]
})
export class ChartIntervalComponent implements OnInit {

  @Input() intervals: { defaultInterval: ItemDataPlot, extraIntervals: ItemExtraPlot[]  }

  constructor(
    private itemChartService: ItemChartService,
    private comparisonChartService: ComparisonChartService
    ) {}

  availableIntervals: string[]
  defaultIntervalName = "Auto"
  selectedInterval = this.defaultIntervalName;

  ngOnInit(): void {
    this.availableIntervals = this.intervals.extraIntervals.map(interval => interval.interval)
  }

  changeChartInterval(inputInterval: string) {
    this.selectedInterval = inputInterval
    let newPlotData = null
    if (inputInterval === this.defaultIntervalName) {
      newPlotData = this.intervals.defaultInterval
    } else {
      newPlotData = this.intervals.extraIntervals.find(interval => interval.interval === inputInterval)?.data
    }
    this.itemChartService.setInterval(interval)
    this.comparisonChartService.setInterval(inputInterval)
    this.itemChartService.setCurrentPlot(newPlotData)
  }

}

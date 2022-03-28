import { Component, Input, OnInit } from "@angular/core";
import { ItemDataPlot, ItemExtraPlot } from "src/app/items.service.model";
import { ItemChartService } from "src/app/_services/item-chart.service";

@Component({
  selector: "app-chart-interval",
  templateUrl: "./chart-interval.component.html",
  styleUrls: ["./chart-interval.component.css"]
})
export class ChartIntervalComponent implements OnInit {

  @Input() intervals: { defaultInterval: ItemDataPlot, extraIntervals: ItemExtraPlot[]  }

  constructor(private itemChartService: ItemChartService) {}

  availableIntervals: string[]
  selectedInterval = "Default interval";

  ngOnInit(): void {
    this.availableIntervals = this.intervals.extraIntervals.map(interval => interval.interval)
    console.log(this.availableIntervals)
  }

  changeChartInterval(inputInterval: string) {
    console.log("changed interval " + inputInterval)
    this.selectedInterval = inputInterval
    const newPlotData = this.intervals.extraIntervals.find(interval => interval.interval === inputInterval)
    console.log(newPlotData)
    this.itemChartService.setCurrentPlot(newPlotData.data)
  }

}

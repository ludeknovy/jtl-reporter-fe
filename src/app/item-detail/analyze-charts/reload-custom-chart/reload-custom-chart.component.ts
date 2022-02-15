import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-reload-custom-chart",
  templateUrl: "./reload-custom-chart.component.html",
  styleUrls: ["./reload-custom-chart.component.css"]
})
export class ReloadCustomChartComponent {

  @Output() chartUpdate = new EventEmitter<any[]>();


  reloadCustomChart() {
    this.chartUpdate.emit(undefined)
  }

}

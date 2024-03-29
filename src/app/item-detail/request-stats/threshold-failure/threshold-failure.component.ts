import { Component, Input, OnInit } from "@angular/core";
import { ThresholdResult } from "../../../items.service.model";

@Component({
  selector: "app-threshold-failure",
  templateUrl: "./threshold-failure.component.html",
  styleUrls: ["./threshold-failure.component.css"]
})
export class ThresholdFailureComponent implements OnInit {

  @Input() thresholdResult: { passed: boolean, result: ThresholdResult };

  protected readonly Math = Math;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
  }
}

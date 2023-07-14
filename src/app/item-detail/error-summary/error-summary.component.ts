import { Component, Input, OnInit } from "@angular/core";
import { ErrorSummary } from "../../items.service.model";

@Component({
  selector: "app-error-summary",
  templateUrl: "./error-summary.component.html",
  styleUrls: ["./error-summary.component.css", "../../shared-styles.css", "../item-detail.component.scss"]
})
export class ErrorSummaryComponent implements OnInit {

  @Input() errorSummary: ErrorSummary;

  constructor() {
  }

  ngOnInit(): void {
  }

}

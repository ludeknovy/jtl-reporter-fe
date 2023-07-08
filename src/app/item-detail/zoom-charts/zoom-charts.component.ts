import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemChartService } from "../../_services/item-chart.service";

@Component({
  selector: "app-zoom-charts",
  templateUrl: "./zoom-charts.component.html",
  styleUrls: ["./zoom-charts.component.css"]
})
export class ZoomChartsComponent implements OnInit {

  @Input() reportStartDate: string;
  @Input() reportEndDate: string;


  constructor(
    private modalService: NgbModal,
    private itemChartService: ItemChartService
    ) {
  }

  formGroup: FormGroup;
  startDateControl = null;
  endDateControl = null;

  ngOnInit() {
    this.itemChartService.setPlotRange({ start: new Date(this.reportStartDate), end: new Date(this.reportEndDate) })

    this.startDateControl = new FormControl(new Date(this.reportStartDate), { validators: [Validators.required, DateTimeValidator] });
    this.endDateControl = new FormControl(new Date(this.reportEndDate), { validators: [Validators.required, DateTimeValidator] });

    this.formGroup = new FormGroup({
      startDate: this.startDateControl,
      endDate: this.endDateControl
    }, { updateOn: "change" });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onSubmit() {
    this.itemChartService.setPlotRange({ start: new Date(this.formGroup.value.startDate), end: new Date(this.formGroup.value.endDate) })
    this.modalService.dismissAll();
  }

  setOriginalStartDate() {
    this.startDateControl.setValue(this.reportStartDate)
  }

  setOriginalEndDate() {
    this.endDateControl.setValue(this.reportEndDate)
  }

}

export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
    isValid: {
      valid: false
    }
  };
};

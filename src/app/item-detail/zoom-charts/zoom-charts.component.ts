import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct, NgbModal, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-zoom-charts",
  templateUrl: "./zoom-charts.component.html",
  styleUrls: ["./zoom-charts.component.css"]
})
export class ZoomChartsComponent implements OnInit {

  @Input() reportStartDate: string;
  @Input() reportEndDate: string;

  constructor(private modalService: NgbModal) {
  }

  formGroup: FormGroup;
  startDateControl = null;
  endDateControl = null;

  ngOnInit() {
    console.log(this.reportStartDate);
    console.log(this.reportEndDate);

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
    console.log(this.formGroup.value);

    this.modalService.dismissAll();

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

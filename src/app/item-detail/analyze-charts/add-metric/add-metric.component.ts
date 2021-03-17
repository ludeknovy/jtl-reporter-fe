import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-metric',
  templateUrl: './add-metric.component.html',
  styleUrls: ['./add-metric.component.css']
})
export class AddMetricComponent implements OnInit {

  @Input() chartLines;
  overallChartLines;
  labelsChartLines;
  metricForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
  }

  private addCheckboxes() {
    this.overallChartLines.forEach(() => this.metricsFormArray.push(new FormControl(false)));
  }

  get metricsFormArray() {
    return this.metricForm.controls.metrics as FormArray;
  }

  ngOnInit() {
    this.overallChartLines = Array.from(this.chartLines.overall.keys())
    console.log(this.overallChartLines)

    this.metricForm = this.formBuilder.group({
      metrics: new FormArray([])
    });
    this.addCheckboxes();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit() {
    console.log(this.metricForm.value)
    const selectedMetrics = this.metricForm.value.metrics
      .map((checked, i) => checked ? this.overallChartLines[i] : null)
      .filter(v => v !== null);
    console.log(selectedMetrics)
  }

}

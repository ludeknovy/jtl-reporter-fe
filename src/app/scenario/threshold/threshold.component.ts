import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { NotificationMessage } from 'src/app/notification/notification-messages';
import { ScenarioApiService } from 'src/app/scenario-api.service';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.css']
})
export class ThresholdComponent implements OnInit {

  thresholdForm: FormGroup;
  percentile;
  errorRate;
  throughput;
  enabled;

  @Input() params;

  constructor(
    private modalService: NgbModal,
    private scenarioApiService: ScenarioApiService,
    private notification: NotificationMessage
  ) {}

  ngOnInit(): void {
    this.scenarioApiService.fetchThresholds(this.params.projectName, this.params.scenarioName).subscribe(_ => {
      this.createFormControls(_);
      this.createForm();
    })
  }

  createFormControls(thresholds) {
    this.percentile = new FormControl(thresholds.percentile, [
      Validators.min(0),
      Validators.max(100),
      Validators.required,
    ]);
    this.throughput = new FormControl(thresholds.throughput, [
      Validators.min(0),
      Validators.max(100),
      Validators.required,
    ]);
    this.errorRate = new FormControl(thresholds.errorRate, [
      Validators.min(0),
      Validators.max(100),
      Validators.required
    ]);
    this.enabled = new FormControl(thresholds.enabled, [
      Validators.required,
    ]);
  }

  createForm() {
    this.thresholdForm = new FormGroup({
      percentile: this.percentile,
      throughput: this.throughput,
      errorRate: this.errorRate,
      enabled: this.enabled
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  onSubmit() {
    if (this.thresholdForm.valid) {
      const { projectName, scenarioName } = this.params;
      const body = {
        errorRate: parseFloat(this.thresholdForm.value.errorRate),
        throughput: parseFloat(this.thresholdForm.value.throughput),
        percentile: parseFloat(this.thresholdForm.value.percentile),
        enabled: this.thresholdForm.value.enabled
      };

      this.scenarioApiService.updateThresholds(projectName, scenarioName, body)
        .pipe(catchError(r => of(r)))
        .subscribe(_ => {
          const message = this.notification.scenarioThresholdUpdate(_);
          this.scenarioApiService.setData(message);
        });
      this.modalService.dismissAll();
    }
  }


}


